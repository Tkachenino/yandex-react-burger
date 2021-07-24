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
});
