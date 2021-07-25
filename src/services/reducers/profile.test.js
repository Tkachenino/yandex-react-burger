/* eslint-disable no-undef */
import { profileReducer as reducer } from "./profile";
import * as types from "../action-types/profile";

describe("profile reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      user: { email: "", name: "" },
      loading: false,
      isAuth: false,
      error: null,
    });
  });

  it("should handle register request", () => {
    expect(
      reducer(
        {
          user: { email: "", name: "" },
          loading: false,
          isAuth: false,
          error: null,
        },
        {
          type: types.REGISTER_REQUEST,
        }
      )
    ).toEqual({
      user: { email: "", name: "" },
      loading: true,
      isAuth: false,
      error: null,
    });
  });

  it("should handle register request success", () => {
    expect(
      reducer(
        {
          user: { email: "", name: "" },
          loading: true,
          isAuth: false,
          error: null,
        },
        {
          type: types.REGISTER_SUCCESS,
          payload: {
            email: "test@email.com",
            name: "test",
          },
        }
      )
    ).toEqual({
      user: { email: "test@email.com", name: "test" },
      loading: false,
      isAuth: true,
      error: null,
    });
  });

  it("should handle register request failure", () => {
    expect(
      reducer(
        {
          user: { email: "", name: "" },
          loading: true,
          isAuth: false,
          error: null,
        },
        {
          type: types.REGISTER_ERROR,
          payload: { error: { message: "this page is not found", code: 404 } },
        }
      )
    ).toEqual({
      user: { email: "", name: "" },
      loading: false,
      isAuth: false,
      error: { message: "this page is not found", code: 404 },
    });
  });

  it("should handle auth request", () => {
    expect(
      reducer(
        {
          user: { email: "", name: "" },
          loading: false,
          isAuth: false,
          error: null,
        },
        {
          type: types.AUTH_REQUEST,
        }
      )
    ).toEqual({
      user: { email: "", name: "" },
      loading: true,
      isAuth: false,
      error: null,
    });
  });

  it("should handle auth request success", () => {
    expect(
      reducer(
        {
          user: { email: "", name: "" },
          loading: true,
          isAuth: false,
          error: null,
        },
        {
          type: types.AUTH_SUCCESS,
          payload: {
            email: "test@email.com",
            name: "test",
          },
        }
      )
    ).toEqual({
      user: { email: "test@email.com", name: "test" },
      loading: false,
      isAuth: true,
      error: null,
    });
  });

  it("should handle auth request failure", () => {
    expect(
      reducer(
        {
          user: { email: "", name: "" },
          loading: true,
          isAuth: false,
          error: null,
        },
        {
          type: types.AUTH_ERROR,
          payload: { error: { message: "this page is not found", code: 404 } },
        }
      )
    ).toEqual({
      user: { email: "", name: "" },
      loading: false,
      isAuth: false,
      error: { message: "this page is not found", code: 404 },
    });
  });

  it("should handle profile request / update profile", () => {
    expect(
      reducer(
        {
          user: { email: "", name: "" },
          loading: false,
          isAuth: true,
          error: null,
        },
        {
          type: types.AUTH_REQUEST,
        }
      )
    ).toEqual({
      user: { email: "", name: "" },
      loading: true,
      isAuth: true,
      error: null,
    });

    expect(
      reducer(
        {
          user: { email: "test@email.com", name: "test" },
          loading: false,
          isAuth: true,
          error: null,
        },
        {
          type: types.AUTH_REQUEST,
        }
      )
    ).toEqual({
      user: { email: "test@email.com", name: "test" },
      loading: true,
      isAuth: true,
      error: null,
    });
  });

  it("should handle profile request success / update profile success", () => {
    expect(
      reducer(
        {
          user: { email: "", name: "" },
          loading: true,
          isAuth: true,
          error: null,
        },
        {
          type: types.PROFILE_SUCCESS,
          payload: {
            email: "test@email.com",
            name: "test",
          },
        }
      )
    ).toEqual({
      user: { email: "test@email.com", name: "test" },
      loading: false,
      isAuth: true,
      error: null,
    });

    expect(
      reducer(
        {
          user: { email: "test@email.com", name: "test" },
          loading: false,
          isAuth: true,
          error: null,
        },
        {
          type: types.PROFILE_SUCCESS,
          payload: {
            email: "test2@email.com",
            name: "test2",
          },
        }
      )
    ).toEqual({
      user: { email: "test2@email.com", name: "test2" },
      loading: false,
      isAuth: true,
      error: null,
    });
  });

  it("should handle profile request failure", () => {
    expect(
      reducer(
        {
          user: { email: "", name: "" },
          loading: true,
          isAuth: false,
          error: null,
        },
        {
          type: types.PROFILE_ERROR,
          payload: { error: { message: "this page is not found", code: 404 } },
        }
      )
    ).toEqual({
      user: { email: "", name: "" },
      loading: false,
      isAuth: false,
      error: { message: "this page is not found", code: 404 },
    });
  });

  it("should handle clear profile info", () => {
    expect(
      reducer(
        {
          user: { email: "test@email.com", name: "test" },
          loading: false,
          isAuth: true,
          error: null,
        },
        {
          type: types.CLEAR_PROFILE,
        }
      )
    ).toEqual({
      user: { email: "", name: "" },
      loading: false,
      isAuth: false,
      error: null,
    });
  });
});
