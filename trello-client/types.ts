

import {Card,List} from "@prisma/client";


export type ListWithCards = List &{cards:Card[]};
export type CaardWithList = Card & {list:List}
export type CardWithList = Card & {list:List}
