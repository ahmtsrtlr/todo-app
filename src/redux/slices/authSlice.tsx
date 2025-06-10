import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import type {
  AuthInitialState,
  User,
  LoginData,
  RegisterData,
} from "../../types/Types";

const initialState: AuthInitialState = {
  user: null,
  loading: false,
  error: null,
};

// Helper function to handle client-blocked errors
const handleClientBlockedError = (error: any) => {
  if (
    error.code === "auth/network-request-failed" ||
    error.message.includes("ERR_BLOCKED_BY_CLIENT") ||
    error.message.includes("net::ERR_BLOCKED_BY_CLIENT")
  ) {
    return "Network request blocked. Please check your browser extensions or network settings.";
  }
  return error.message;
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: LoginData, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || "",
      };
    } catch (error: any) {
      return rejectWithValue(handleClientBlockedError(error));
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: userData.displayName,
      });

      return {
        uid: user.uid,
        email: user.email!,
        displayName: userData.displayName,
      };
    } catch (error: any) {
      return rejectWithValue(handleClientBlockedError(error));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Clear any pending operations before logout
      if (auth.currentUser) {
        await signOut(auth);
      }
      return null;
    } catch (error: any) {
      // Handle specific Firebase errors more gracefully
      if (
        error.code === "auth/network-request-failed" ||
        error.message.includes("ERR_BLOCKED_BY_CLIENT") ||
        error.message.includes("net::ERR_BLOCKED_BY_CLIENT")
      ) {
        console.warn(
          "Network error during logout, proceeding with local logout"
        );
        return null; // Still return success for local logout
      }
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return "Password reset email sent successfully";
    } catch (error: any) {
      return rejectWithValue(handleClientBlockedError(error));
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
