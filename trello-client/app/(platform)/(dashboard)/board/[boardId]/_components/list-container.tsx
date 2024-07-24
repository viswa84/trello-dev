// "use client";

// import { ListWithCards } from "@/types";
// import { List } from "@prisma/client";
// import { ListForm } from "./list-form";
// import { useEffect, useState } from "react";
// import { ListItem } from "./list-item";
// import { DragDropContext, Droppable } from "@hello-pangea/dnd";

// interface ListContainerProps {
//   data: ListWithCards[];
//   boardId: string;
// }

// export const ListContainer = ({ data, boardId }: ListContainerProps) => {
//   const [orderdData, setOrderedData] = useState(data);

//   useEffect(() => {
//     setOrderedData(data);
//   }, [data]);
//   function reorder<T>(list: T[], startIndex: number, endIndex: number) {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//     return result;
//   }
//   const onDragEnd = (result: any) => {
//     const { destination, sorce, type } = result;

//     if (!destination) {
//       return;
//     }
//     // if dropped in the same position
//     if (
//       destination.droppableId === sorce.droppableId &&
//       destination.index === sorce.index
//     ) {
//       return;
//     }

//     // User moves a list
//     if (type === "list") {
//       const items = reorder(orderdData, sorce.index, destination.index).map(
//         (item, index) => ({ ...item, order: index })
//       );
//       setOrderedData(items);
//     }
//   };
//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="lists" type="list" direction="horizontal">
//         {(provided) => (
//           <ol
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             className="flex gap-x-3 h-full"
//           >
//             {orderdData.map((list, index) => {
//               return <ListItem key={list.id} index={index} data={list} />;
//             })}
//             {provided.placeholder}
//             <ListForm />
//             <div className="flex-shrink-0 w-1" />
//           </ol>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

"use client";

import { ListWithCards } from "@/types";
import { List } from "@prisma/client";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update -list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update -card-order";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderdData, setOrderedData] = useState(data);
  const { excute: excuteUpadteListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { excute: excuteUpadteCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User moves a list
    if (type === "list") {
      const items = reorder(orderdData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedData(items);
      //TODDo trigger the server action
      excuteUpadteListOrder({ items, boardId });
    }
    //user moves a Card
    if (type === "card") {
      let newOrderedData = [...orderdData];

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );
      if (!sourceList || !destList) {
        return;
      }
      // check if cards exxists on the sorceList
      if (!destList.cards) {
        destList.cards = [];
      }
      //Moving the Card in the same List
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });
        sourceList.cards = reorderedCards;
        excuteUpadteCardOrder({
          boardId: boardId,
          items: reorderedCards,
        });
      } else {
        //user moves card to another list
        // remove card from the sorce
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        // Assign the new  ListId the sorceList
        movedCard.listId = destination.droppableId;

        //add card to the destionation list
        destList.cards.splice(destination.index, 0, movedCard);

        //update the order for each card in the destination list

        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);
        //TOdo trigger server action
        excuteUpadteCardOrder({
          boardId: boardId,
          items: destList.cards,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderdData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
