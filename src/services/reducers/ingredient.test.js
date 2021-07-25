import { ingredientReducer as reducer } from "./ingredient";
import * as types from "../action-types/ingredient";

describe("ingredient reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      ingredientDetail: null,
    });
  });

  it("should handle set detail info ", () => {
    expect(
      reducer(
        { ingredientDetail: null },
        {
          type: types.SET_DETAIL_INFO,
          ingredientDetail: { id: 1, orderData: "test" },
        }
      )
    ).toEqual({
      ingredientDetail: { id: 1, orderData: "test" },
    });
  });

  it("should handle delete detail info", () => {
    expect(
      reducer(
        { ingredientDetail: { id: 1, orderData: "test" } },
        {
          type: types.DELETE_DETAIL_INFO,
          ingredientDetail: { id: 1, orderData: "test" },
        }
      )
    ).toEqual({
      ingredientDetail: null,
    });
  });
});
