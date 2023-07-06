import { expect, describe, it } from "vitest";
import { ShopItem, items, updateQuality } from "./gilded-rose.js";

describe("updateQuality", () => {
  it("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new ShopItem("basic", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });
});

describe("updateQuality", () => {
  it("reduces quality by 2 when sellIn days is less than 0", () => {
    const testItem = new ShopItem("old", -1, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(1);
    expect(testItem.sellIn).toBe(-2);
  });
});

describe("updateQuality", () => {
  it("the quality of an item is never negative", () => {
    const testItem = new ShopItem("notNegative", 3, 0);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(2);
  });
});

describe("updateQuality", () => {
  it("Aged Brie increases in quality as it ages", () => {
    const testItem = new ShopItem("Aged Brie", 5, 6);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(7);
    expect(testItem.sellIn).toBe(4);
  });
});

describe("updateQuality", () => {
  it("quality is never above 50", () => {
    const testItem = new ShopItem("Aged Brie", 4, 50);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(50);
    expect(testItem.sellIn).toBe(3);
  });
});

describe("updateQuality", () => {
  it("Sulfuras, Hand of Ragnaros never has to be sold nor does it's quality decrease", () => {
    const testItem = new ShopItem("Sulfuras, Hand of Ragnaros", 0, 80);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(80);
    expect(testItem.sellIn).toBe(0);
  });
});

describe("updateQuality", () => {
  it("Sulfuras, Hand of Ragnaros never has to be sold nor does it's quality decrease", () => {
    const testItem = new ShopItem("Sulfuras, Hand of Ragnaros", 0, 80);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(80);
    expect(testItem.sellIn).toBe(0);
  });
});

describe("updateQuality", () => {
  it("Backstage passes to a TAFKAL80ETC concert increases in quality as it's sellIn value decreases", () => {
    const testItem = new ShopItem(
      "Backstage passes to a TAFKAL80ETC concert",
      30,
      10
    );
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(11);
    expect(testItem.sellIn).toBe(29);
  });
});

describe("updateQuality", () => {
  it("Backstage passes to a TAFKAL80ETC concert quality increases by 2 when it's sellIn value is 10 or less", () => {
    const testItem = new ShopItem(
      "Backstage passes to a TAFKAL80ETC concert",
      11,
      10
    );
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(12);
    expect(testItem.sellIn).toBe(10);
  });
});

describe("updateQuality", () => {
  it("Backstage passes to a TAFKAL80ETC concert quality increases by 3 when it's sellIn value is 5 or less", () => {
    const testItem = new ShopItem(
      "Backstage passes to a TAFKAL80ETC concert",
      6,
      10
    );
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(13);
    expect(testItem.sellIn).toBe(5);
  });
});

describe("updateQuality", () => {
  it("Backstage passes to a TAFKAL80ETC concert quality drops to 0 when it's sellIn value is less than 0", () => {
    const testItem = new ShopItem(
      "Backstage passes to a TAFKAL80ETC concert",
      0,
      12
    );
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(-1);
  });
});

describe("updateQuality", () => {
  it('"Conjured" items degrade in `quality` twice as fast as normal items.', () => {
    const testItem = new ShopItem("Conjured Armor", 6, 10);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(8);
    expect(testItem.sellIn).toBe(5);
  });
});
