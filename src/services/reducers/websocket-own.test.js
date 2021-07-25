/* eslint-disable no-undef */
import { wsOwnReducer as reducer } from "./websocket-own";
import * as types from "../action-types/websocket-own";

describe("websocket-own reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      wsConnected: false,
      orders: [],
      error: null,
      total: null,
      totalToday: null,
    });
  });

  it("should handle conntect websocket", () => {
    expect(
      reducer(
        {
          wsConnected: false,
          orders: [],
          error: null,
          total: null,
          totalToday: null,
        },
        {
          type: types.WS_CONNECTION_SUCCESS_OWN,
        }
      )
    ).toEqual({
      wsConnected: true,
      orders: [],
      error: null,
      total: null,
      totalToday: null,
    });
  });

  it("should handle error from websocket", () => {
    expect(
      reducer(
        {
          wsConnected: true,
          orders: [],
          error: null,
          total: null,
          totalToday: null,
        },
        {
          type: types.WS_CONNECTION_ERROR_OWN,
          payload: { message: "this page not found", status: 404 },
        }
      )
    ).toEqual({
      wsConnected: false,
      orders: [],
      error: { message: "this page not found", status: 404 },
      total: null,
      totalToday: null,
    });
  });

  it("should handle user close websocket", () => {
    expect(
      reducer(
        {
          wsConnected: true,
          orders: [],
          error: null,
          total: null,
          totalToday: null,
        },
        {
          type: types.WS_CONNECTION_CLOSED_OWN,
        }
      )
    ).toEqual({
      wsConnected: false,
      orders: [],
      error: null,
      total: null,
      totalToday: null,
    });
  });

  it("should handle user close websocket", () => {
    expect(
      reducer(
        {
          wsConnected: true,
          orders: [],
          error: null,
          total: null,
          totalToday: null,
        },
        {
          type: types.WS_GET_MESSAGE_OWN,
          payload: {
            orders: [
              { id: 1, orderData: "more info about order" },
              { id: 2, orderData: "more info about order" },
            ],
            total: 200,
            totalToday: 20,
          },
        }
      )
    ).toEqual({
      wsConnected: true,
      orders: [
        { id: 1, orderData: "more info about order" },
        { id: 2, orderData: "more info about order" },
      ],
      error: null,
      total: 200,
      totalToday: 20,
    });
  });
});
