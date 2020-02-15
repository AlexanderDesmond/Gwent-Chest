import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { DeckTableDataSource, DeckTableItem } from "./deck-table-datasource";
import { DeckService } from "src/app/core/services/deck.service";

@Component({
  selector: "app-deck-table",
  templateUrl: "./deck-table.component.html",
  styleUrls: ["./deck-table.component.scss"]
})
export class DeckTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<DeckTableItem>;
  dataSource: DeckTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  //displayedColumns = ["id", "name"];
  displayedColumns = ["score", "faction", "ability", "name", "username"];

  //
  deckList = [];
  constructor(private deckService: DeckService) {
    this.deckService.getCatalogue().subscribe(
      data => {
        this.deckList = this.formatDeckList(data);
        console.log(this.deckList);
        this.dataSource = new DeckTableDataSource(this.deckList);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
    /*
    this.deckService.getCatalogue().subscribe(
      data => {
        this.deckList = this.formatDeckList(data);
        console.log(this.deckList);
        this.dataSource = new DeckTableDataSource(this.deckList);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      error => console.log(error)
    );
    */
    //this.dataSource = new DeckTableDataSource(this.deckList);
  }

  ngAfterViewInit() {
    /*
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    */
  }

  //
  formatDeckList(deckList) {
    const decks = [];
    for (let deck of deckList) {
      decks.push({
        score: deck.points,
        faction: deck.deck.faction,
        ability: deck.deck.leader.name["en-US"],
        name: deck.name,
        username: deck.username,
        id: deck._id
      });
    }

    return decks;
  }

  getDeckColour(faction) {
    let colour;

    switch (faction) {
      case "Neutral":
        colour = "rgb(40, 30, 15)";
        break;
      case "Northern Realms":
        colour = "rgb(5, 25, 70)";
        break;
      case "Syndicate":
        colour = "rgb(55, 20, 5)";
        break;
      case "Skellige":
        colour = "rgb(30, 30, 50)";
        break;
      case "Scoiatael":
        colour = "rgb(45, 45, 10)";
        break;
      case "Nilfgaard":
        colour = "rgb(15, 20, 20)";
        break;
      case "Monster":
        colour = "rgb(64, 12, 4)";
        break;
      default:
        colour = "white";
        break;
    }

    return colour;
  }

  onClick(id) {
    alert(id);
  }
}
