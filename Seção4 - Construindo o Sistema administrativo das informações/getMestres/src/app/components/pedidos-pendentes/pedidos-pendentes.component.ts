import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { IPedidosPendentes } from '../../interfaces/IPedidosPendentes';


const DATA_MOCK: IPedidosPendentes[] = [
  { customerName: "Joao da Silva", date: "01/01/2019", category: "Construção", subCategory: "Reforma" },
  { customerName: "Cleiton moreira", date: "05/08/2020", category: "Construção", subCategory: "Reforma" },
  { customerName: "Jader herickson", date: "09/11/2009", category: "Construção", subCategory: "Reforma" },
  { customerName: "Do you like chocolate", date: "10/10/2010", category: "Construção", subCategory: "Reforma" }
]

@Component({
  selector: 'pedidos-pendentes',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './pedidos-pendentes.component.html',
  styleUrl: './pedidos-pendentes.component.scss'
})

export class PedidosPendentesComponent {
  columns: string[] = ["Nome", "Data", "Categoria", "SubCategoria"]
  dataSource: MatTableDataSource<IPedidosPendentes> = new MatTableDataSource<IPedidosPendentes>(DATA_MOCK)

  constructor(){

  }

  ngOnInit(){

  }
}
