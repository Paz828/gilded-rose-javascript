// export class Item {
//   constructor(name, sellIn, quality) {
//     this.name = name;
//     this.sellIn = sellIn;
//     this.quality = quality;
//   }
// }

// export let items = [];

// items.push(new Item("+5 Dexterity Vest", 10, 20));
// items.push(new Item("Aged Brie", 2, 0));
// items.push(new Item("Elixir of the Mongoose", 5, 7));
// items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
// items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
// items.push(new Item("Conjured Mana Cake", 3, 6));

// export const updateQuality = () => {
//   for (let item of items) {
//     if (
//       item.name != "Aged Brie" &&
//       item.name != "Backstage passes to a TAFKAL80ETC concert"
//     ) {
//       if (item.quality > 0) {
//         if (item.name != "Sulfuras, Hand of Ragnaros") {
//           item.quality = item.quality - 1;
//         }
//       }
//     } else {
//       if (item.quality < 50) {
//         item.quality = item.quality + 1;
//         if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
//           if (item.sellIn < 11) {
//             if (item.quality < 50) {
//               item.quality = item.quality + 1;
//             }
//           }
//           if (item.sellIn < 6) {
//             if (item.quality < 50) {
//               item.quality = item.quality + 1;
//             }
//           }
//         }
//       }
//     }
//     if (item.name != "Sulfuras, Hand of Ragnaros") {
//       item.sellIn = item.sellIn - 1;
//     }
//     if (item.sellIn < 0) {
//       if (item.name != "Aged Brie") {
//         if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
//           if (item.quality > 0) {
//             if (item.name != "Sulfuras, Hand of Ragnaros") {
//               item.quality = item.quality - 1;
//             }
//           }
//         } else {
//           item.quality = item.quality - item.quality;
//         }
//       } else {
//         if (item.quality < 50) {
//           item.quality = item.quality + 1;
//         }
//       }
//     }
//   }
// };
export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class ShopItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateSellIn() {
    if (this.name === "Sulfuras, Hand of Ragnaros") {
      return; // Legendary item, quality never changes
    } else {
      this.sellIn -= 1;
    }
  }

  updateQuality() {
    if (this.name === "Sulfuras, Hand of Ragnaros") {
      return; // Legendary item, quality never changes
    }

    if (this.name === "Aged Brie") {
      this.updateQualityAgedBrie();
    } else if (this.name === "Backstage passes to a TAFKAL80ETC concert") {
      this.updateQualityBackstagePass();
    } else if (this.name.startsWith("Conjured")) {
      this.updateQualityConjured();
    } else {
      this.updateQualityNormal();
    }

    this.quality = Math.max(0, this.quality);
    this.quality = Math.min(50, this.quality);
  }

  updateQualityNormal() {
    if (this.sellIn >= 0) {
      this.quality -= 1;
    } else {
      this.quality -= 2;
    }
  }

  updateQualityAgedBrie() {
    this.quality += 1;
  }

  updateQualityBackstagePass() {
    if (this.sellIn >= 0) {
      if (this.sellIn <= 5) {
        this.quality += 3;
      } else if (this.sellIn <= 10) {
        this.quality += 2;
      } else {
        this.quality += 1;
      }
    } else {
      this.quality = 0;
    }
  }

  updateQualityConjured() {
    if (this.sellIn >= 0) {
      this.quality -= 2;
    } else {
      this.quality -= 4;
    }
  }
}

export class AgedBrieItem extends ShopItem {
  updateQuality() {
    super.updateQuality();
    if (this.sellIn < 0) {
      this.quality += 1;
      this.quality = Math.min(50, this.quality);
    }
  }
}

export class BackstagePassItem extends ShopItem {
  updateQuality() {
    super.updateQuality();
    if (this.sellIn < 0) {
      this.quality = 0;
    } else if (this.sellIn <= 5) {
      this.quality += 3;
    } else if (this.sellIn <= 10) {
      this.quality += 2;
    } else {
      this.quality += 1;
    }
    this.quality = Math.min(50, this.quality);
  }
}

export class SulfurasItem extends ShopItem {
  updateSellIn() {
    // Sulfuras items do not change price
  }
  updateQuality() {
    // Sulfuras items do not change quality
  }
}

export const items = [
  new ShopItem("+5 Dexterity Vest", 10, 20),
  new AgedBrieItem("Aged Brie", 2, 0),
  new ShopItem("Elixir of the Mongoose", 5, 7),
  new SulfurasItem("Sulfuras, Hand of Ragnaros", 0, 80),
  new BackstagePassItem("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new ShopItem("Conjured Mana Cake", 3, 6),
];

export const updateQuality = () => {
  for (const item of items) {
    item.updateSellIn();
    item.updateQuality();
  }
};
