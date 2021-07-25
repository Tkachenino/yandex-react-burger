import { constructorReducer as reducer } from "./constructor";
import * as types from "../action-types/constructor";

describe("constructor reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      constructorIngredient: [],
      bun: null,
      totalCost: 0,
    });
  });

  it("should handle add first ingredient / second ingredient", () => {
    expect(
      reducer(
        { constructorIngredient: [], bun: null, totalCost: 0 },
        {
          type: types.ADD_INGREDIENT,
          ingredient: { id: 1, name: "test" },
          constructorId: 1,
        }
      )
    ).toEqual({
      constructorIngredient: [{ constructorId: 1, id: 1, name: "test" }],
      bun: null,
      totalCost: 0,
    });

    expect(
      reducer(
        {
          constructorIngredient: [{ id: 1, name: "test", constructorId: 1 }],
          bun: null,
          totalCost: 0,
        },
        {
          type: types.ADD_INGREDIENT,
          ingredient: { id: 2, name: "test2" },
          constructorId: 2,
        }
      )
    ).toEqual({
      constructorIngredient: [
        { constructorId: 1, id: 1, name: "test" },
        { id: 2, name: "test2", constructorId: 2 },
      ],
      bun: null,
      totalCost: 0,
    });
  });

  it("should handle remove ingredient", () => {
    expect(
      reducer(
        {
          constructorIngredient: [{ constructorId: 1, id: 1, name: "test" }],
          bun: null,
          totalCost: 0,
        },
        {
          type: types.REMOVE_INGREDIENT,
          id: 1,
        }
      )
    ).toEqual({
      constructorIngredient: [],
      bun: null,
      totalCost: 0,
    });
  });

  it("should handle clear all ingredients", () => {
    expect(
      reducer(
        {
          constructorIngredient: [
            { constructorId: 1, id: 1, name: "test" },
            { constructorId: 2, id: 2, name: "test" },
          ],
          bun: { constructorId: 3, id: 3, name: "test bun" },
          totalCost: 0,
        },
        {
          type: types.CLEAR_INGREDIENTS,
        }
      )
    ).toEqual({
      constructorIngredient: [],
      bun: null,
      totalCost: 0,
    });
  });

  it("should handle add first bun / other buns", () => {
    expect(
      reducer(
        {
          constructorIngredient: [{ constructorId: 1, id: 1, name: "test" }],
          bun: null,
          totalCost: 0,
        },
        {
          type: types.ADD_BUN,
          bun: { id: 2, name: "test bun" },
          constructorId: 2,
        }
      )
    ).toEqual({
      constructorIngredient: [{ constructorId: 1, id: 1, name: "test" }],
      bun: { constructorId: 2, id: 2, name: "test bun" },
      totalCost: 0,
    });

    expect(
      reducer(
        {
          constructorIngredient: [{ constructorId: 1, id: 1, name: "test" }],
          bun: { constructorId: 2, id: 2, name: "test bun" },
          totalCost: 0,
        },
        {
          type: types.ADD_BUN,
          bun: { id: 3, name: "test bun" },
          constructorId: 3,
        }
      )
    ).toEqual({
      constructorIngredient: [{ constructorId: 1, id: 1, name: "test" }],
      bun: { constructorId: 3, id: 3, name: "test bun" },
      totalCost: 0,
    });
  });

  it("should handle remove bun", () => {
    expect(
      reducer(
        {
          constructorIngredient: [
            { constructorId: 1, id: 1, name: "test" },
            { constructorId: 2, id: 2, name: "test" },
          ],
          bun: { constructorId: 3, id: 3, name: "test bun" },
          totalCost: 0,
        },
        {
          type: types.REMOVE_BUN,
        }
      )
    ).toEqual({
      constructorIngredient: [
        { constructorId: 1, id: 1, name: "test" },
        { constructorId: 2, id: 2, name: "test" },
      ],
      bun: null,
      totalCost: 0,
    });
  });

  it("should handle rebase item order from 2 to 0", () => {
    expect(
      reducer(
        {
          constructorIngredient: [
            { constructorId: 1, id: 1, name: "test" },
            { constructorId: 2, id: 2, name: "test" },
            { constructorId: 3, id: 3, name: "test" },
          ],
          bun: { constructorId: 3, id: 3, name: "test bun" },
          totalCost: 0,
        },
        {
          type: types.REBASE_ITEMS,
          dragIndex: 2,
          hoverIndex: 1,
        }
      )
    ).toEqual({
      constructorIngredient: [
        { constructorId: 1, id: 1, name: "test" },
        { constructorId: 3, id: 3, name: "test" },
        { constructorId: 2, id: 2, name: "test" },
      ],
      bun: { constructorId: 3, id: 3, name: "test bun" },
      totalCost: 0,
    });
  });

  expect(
    reducer(
      {
        constructorIngredient: [
          { constructorId: 1, id: 1, name: "test" },
          { constructorId: 3, id: 3, name: "test" },
          { constructorId: 2, id: 2, name: "test" },
        ],
        bun: { constructorId: 3, id: 3, name: "test bun" },
        totalCost: 0,
      },
      {
        type: types.REBASE_ITEMS,
        dragIndex: 1,
        hoverIndex: 0,
      }
    )
  ).toEqual({
    constructorIngredient: [
      { constructorId: 3, id: 3, name: "test" },
      { constructorId: 1, id: 1, name: "test" },
      { constructorId: 2, id: 2, name: "test" },
    ],
    bun: { constructorId: 3, id: 3, name: "test bun" },
    totalCost: 0,
  });

  it("should handle calc totalCost / with only ingredients / with only bun", () => {
    expect(
      reducer(
        {
          constructorIngredient: [
            { constructorId: 1, id: 1, name: "test", price: 5 },
            { constructorId: 2, id: 2, name: "test", price: 10 },
          ],
          bun: { constructorId: 3, id: 3, name: "test bun", price: 2 },
          totalCost: 0,
        },
        {
          type: types.CALC_TOTAL_COST,
        }
      )
    ).toEqual({
      constructorIngredient: [
        { constructorId: 1, id: 1, name: "test", price: 5 },
        { constructorId: 2, id: 2, name: "test", price: 10 },
      ],
      bun: { constructorId: 3, id: 3, name: "test bun", price: 2 },
      totalCost: 19,
    });

    expect(
      reducer(
        {
          constructorIngredient: [
            { constructorId: 1, id: 1, name: "test", price: 5 },
            { constructorId: 2, id: 2, name: "test", price: 10 },
          ],
          bun: null,
          totalCost: 0,
        },
        {
          type: types.CALC_TOTAL_COST,
        }
      )
    ).toEqual({
      constructorIngredient: [
        { constructorId: 1, id: 1, name: "test", price: 5 },
        { constructorId: 2, id: 2, name: "test", price: 10 },
      ],
      bun: null,
      totalCost: 15,
    });

    expect(
      reducer(
        {
          constructorIngredient: [],
          bun: { constructorId: 3, id: 3, name: "test bun", price: 2 },
          totalCost: 0,
        },
        {
          type: types.CALC_TOTAL_COST,
        }
      )
    ).toEqual({
      constructorIngredient: [],
      bun: { constructorId: 3, id: 3, name: "test bun", price: 2 },
      totalCost: 4,
    });
  });
});
