import { ingredientsReducer as reducer } from "./ingredients";
import * as types from "../action-types/ingredients";

describe("ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: null,
      ingredients: [],
    });
  });

  it("should handle get item request ", () => {
    expect(
      reducer(
        { loading: false, error: null, ingredients: [] },
        {
          type: types.GET_ITEM_REQUEST,
        }
      )
    ).toEqual({
      loading: true,
      error: null,
      ingredients: [],
    });
  });

  it("should handle get item request success", () => {
    expect(
      reducer(
        { loading: true, error: null, ingredients: [] },
        {
          type: types.GET_ITEM_SUCCESS,
          ingredients: [
            { id: 1, name: "test", price: 10 },
            { id: 2, name: "test", price: 5 },
          ],
        }
      )
    ).toEqual({
      loading: false,
      error: null,
      ingredients: [
        { id: 1, name: "test", price: 10 },
        { id: 2, name: "test", price: 5 },
      ],
    });
  });

  it("should handle get item request failure", () => {
    expect(
      reducer(
        { loading: true, error: null, ingredients: [] },
        {
          type: types.GET_ITEM_ERROR,
          error: { message: "this page is not found", code: 404 },
        }
      )
    ).toEqual({
      loading: false,
      error: { message: "this page is not found", code: 404 },
      ingredients: [],
    });
  });
});
