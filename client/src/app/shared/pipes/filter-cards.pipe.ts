import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterCards",
  pure: false
})
export class FilterCardsPipe implements PipeTransform {
  transform(cards: any, ...args: any[]): any {
    let cardsList = cards;

    // Faction option.
    if (args[0] === null || args[0] === undefined) {
      // If the faction parameter is not present, just return all the cards.
      cardsList = cards;
    } else {
      let factionList = cardsList;
      if (args[0] === "Neutral") {
        // Return neutral cards.
        cardsList = factionList.filter(card => card.data.faction === "Neutral");
      } else if (args[0].includes("|")) {
        const temp = args[0].split("|");

        // Return neutral and cards of the selected leader's faction.
        cardsList = factionList.filter(
          card =>
            card.data.faction === temp[1] ||
            card.data.secondaryFaction === temp[1] ||
            card.data.faction === "Neutral"
        );
      } else {
        // Return cards of the selected leader's faction.
        cardsList = factionList.filter(
          card =>
            card.data.faction === args[0] ||
            card.data.secondaryFaction === args[0]
        );
      }
    }

    // Type option
    if (args[1] !== null || args[1] !== undefined) {
      let typeList = cardsList;

      if (args[1] === "Unit") {
        cardsList = typeList.filter(card => card.data.cardType === "Unit");
      } else if (args[1] === "Special") {
        cardsList = typeList.filter(card => card.data.cardType === "Spell");
      } else if (args[1] === "Artifact") {
        cardsList = typeList.filter(card => card.data.cardType === "Artifact");
      }
    }

    // Colour option
    if (args[2] !== null || args[2] !== undefined) {
      let colourList = cardsList;

      if (args[2] === "Gold") {
        cardsList = colourList.filter(card => card.data.type === "Gold");
      } else if (args[2] === "Bronze") {
        cardsList = colourList.filter(card => card.data.type === "Bronze");
      }
    }

    // Return the filtered cards.
    return cardsList;
  }
}
