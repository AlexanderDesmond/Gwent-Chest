import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterDeck",
  pure: false
})
export class FilterDeckPipe implements PipeTransform {
  transform(cards: any, ...args: any[]): unknown {
    return cards.sort((a, b) => b.provision - a.provision);
  }
}
