/* eslint-disable no-undef */
import { orderReducer as reducer } from "./order";
import * as types from "../action-types/order";

describe("order reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      orderId: null,
      order: null,
      orderLoading: false,
      orderError: null,
    });
  });

  it("should handle set order request ", () => {
    expect(
      reducer(
        { orderId: null, order: null, orderLoading: false, orderError: null },
        {
          type: types.SET_ORDER_REQUEST,
        }
      )
    ).toEqual({
      orderId: null,
      order: null,
      orderLoading: true,
      orderError: null,
    });
  });

  it("should handle set order request success", () => {
    expect(
      reducer(
        { orderId: null, order: null, orderLoading: true, orderError: null },
        {
          type: types.SET_ORDER_SUCCESS,
          orderId: "#weryLongTestId#",
        }
      )
    ).toEqual({
      orderId: "#weryLongTestId#",
      order: null,
      orderLoading: false,
      orderError: null,
    });
  });

  it("should handle set order request failure", () => {
    expect(
      reducer(
        { orderId: null, order: null, orderLoading: true, orderError: null },
        {
          type: types.SET_ORDER_ERROR,
          error: { message: "this page is not found", code: 404 },
        }
      )
    ).toEqual({
      orderId: null,
      order: null,
      orderLoading: false,
      orderError: { message: "this page is not found", code: 404 },
    });
  });

  it("should handle get order request ", () => {
    expect(
      reducer(
        { orderId: null, order: null, orderLoading: false, orderError: null },
        {
          type: types.GET_ORDER_REQUEST,
        }
      )
    ).toEqual({
      orderId: null,
      order: null,
      orderLoading: true,
      orderError: null,
    });
  });

  it("should handle get order request success", () => {
    expect(
      reducer(
        { orderId: null, order: null, orderLoading: true, orderError: null },
        {
          type: types.GET_ORDER_SUCCESS,
          order: { id: 1, orderData: "some order data with date, ingredient and others" },
        }
      )
    ).toEqual({
      orderId: null,
      order: { id: 1, orderData: "some order data with date, ingredient and others" },
      orderLoading: false,
      orderError: null,
    });
  });

  it("should handle get order request failure", () => {
    expect(
      reducer(
        { orderId: null, order: null, orderLoading: true, orderError: null },
        {
          type: types.GET_ORDER_ERROR,
          error: { message: "this page is not found", code: 404 },
        }
      )
    ).toEqual({
      orderId: null,
      order: null,
      orderLoading: false,
      orderError: { message: "this page is not found", code: 404 },
    });
  });

  it("should handle clear error data", () => {
    expect(
      reducer(
        {
          orderId: null,
          order: null,
          orderLoading: false,
          orderError: { message: "this page is not found", code: 404 },
        },
        {
          type: types.CLEAR_ORDER_ERROR,
        }
      )
    ).toEqual({
      orderId: null,
      order: null,
      orderLoading: false,
      orderError: null,
    });
  });
});
