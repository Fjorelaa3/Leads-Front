import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "CARD";
const ColumnType = "COLUMN";

const Card = ({ card, onCardRemove, onCardMove, columnIndex }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { id: card.id, columnId: columnIndex },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      if (item && item.id) {
        onCardMove(item.id, item.columnId, columnIndex);
      }
    },
  });

  const [newContent, setNewContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleAddContent = () => {
    if (newContent.trim() === "") {
      return;
    }
    const updatedCard = { ...card };
    updatedCard.description += `\n${newContent}`;
    onCardMove(card.id, card.columnId, columnIndex, updatedCard.description);
    setNewContent("");
    setIsEditing(false);
  };

  return (
    <div ref={(node) => ref(drop(node))} className="card">
      <h4>{card.title}</h4>
      <p>{card.description}</p>
      {isEditing ? (
        <div>
          <textarea
            placeholder="Enter new content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button onClick={handleAddContent}>Add</button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)}>Add Content</button>
      )}

      <button onClick={() => onCardRemove(card.id)}>Remove</button>
    </div>
  );
};

const Column = ({
  title,
  cards,
  onCardRemove,
  onCardMove,
  onCardAdd,
  columnId,
  board,
  setBoard,
}) => {
  const [, columnRef] = useDrag({
    type: ColumnType,
    item: { id: title },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      if (item.columnId !== title) {
        const updatedColumns = [...board.columns];
        const sourceColumnIndex = updatedColumns.findIndex(
          (col) => col.title === item.columnId
        );
        const destinationColumnIndex = updatedColumns.findIndex(
          (col) => col.title === title
        );

        if (sourceColumnIndex !== -1 && destinationColumnIndex !== -1) {
          const [draggedCard] = updatedColumns[sourceColumnIndex].cards.filter(
            (card) => card.id === item.id
          );
          updatedColumns[sourceColumnIndex].cards = updatedColumns[
            sourceColumnIndex
          ].cards.filter((card) => card.id !== item.id);
          updatedColumns[destinationColumnIndex].cards.push(draggedCard);
          setBoard({ ...board, columns: updatedColumns });
        }
      }
    },
  });

  const [newCardTitle, setNewCardTitle] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleAddCard = () => {
    if (newCardTitle.trim() === "") {
      return;
    }

    onCardAdd(title, newCardTitle);
    setNewCardTitle("");
    setIsAddingCard(false);
  };

  return (
    <div ref={(node) => columnRef(drop(node))} className="column">
      <h3>{title}</h3>
      <div className="column-content">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onCardRemove={onCardRemove}
            onCardMove={onCardMove}
            columnIndex={columnId}
            board={board}
            setBoard={setBoard}
          />
        ))}
      </div>
      {isAddingCard ? (
        <div>
          <input
            type="text"
            placeholder="Enter new card title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <button onClick={handleAddCard}>Add Card</button>
        </div>
      ) : (
        <button
          className="add-class-button"
          onClick={() => setIsAddingCard(true)}
        >
          Add Card
        </button>
      )}
    </div>
  );
};

const KanbanBoard = ({ boardData }) => {
  const [board, setBoard] = useState(boardData);

  const handleCardRemove = (cardId) => {
    setBoard((prevBoard) => {
      const updatedColumns = prevBoard.columns.map((column) => {
        const cardIndex = column.cards.findIndex((card) => card.id === cardId);
        if (cardIndex !== -1) {
          column.cards.splice(cardIndex, 1);
        }
        return column;
      });

      return { ...prevBoard, columns: updatedColumns };
    });
  };

  const handleCardMove = (
    cardId,
    sourceColumnId,
    destinationColumnId,
    newContent
  ) => {
    setBoard((prevBoard) => {
      const updatedColumns = prevBoard.columns.map((column) => {
        if (column.title === sourceColumnId) {
          column.cards = column.cards.filter((card) => card.id !== cardId);
        }
        if (column.title === destinationColumnId) {
          const movedCard = prevBoard.columns
            .map((col) => col.cards)
            .flat()
            .find((card) => card.id === cardId);

          if (movedCard) {
            if (newContent) {
              movedCard.description = newContent;
            }
            column.cards.push({ ...movedCard });
          }
        }
        return column;
      });

      return { ...prevBoard, columns: updatedColumns };
    });
  };

  const handleCardAdd = (columnTitle, cardTitle) => {
    setBoard((prevBoard) => {
      const updatedColumns = prevBoard.columns.map((column) => {
        if (column.title === columnTitle) {
          const newCard = {
            id: Date.now(),
            title: cardTitle,
            description: "Card content:",
            columnId: column.title,
          };
          column.cards.push(newCard);
        }
        return column;
      });

      return { ...prevBoard, columns: updatedColumns };
    });
  };

  return (
    <div className="kanban-board">
      {board.columns.map((column, columnIndex) => (
        <Column
          key={column.title}
          title={column.title}
          cards={column.cards}
          onCardRemove={handleCardRemove}
          onCardMove={handleCardMove}
          onCardAdd={handleCardAdd}
          columnId={column.title}
          board={board}
          setBoard={setBoard}
        />
      ))}
    </div>
  );
};

function DashboardPage() {
  const boardData = {
    columns: [
      {
        id: 1,
        title: "Backlog",
        cards: [],
      },
      {
        id: 2,
        title: "Doing",
        cards: [],
      },
      {
        id: 3,
        title: "Review",
        cards: [],
      },
      {
        id: 4,
        title: "Done",
        cards: [],
      },
    ],
  };

  return (
    <div className="all">
      <div className="head">
        <header>Kanban Board</header>
      </div>
      <DndProvider backend={HTML5Backend}>
        <KanbanBoard boardData={boardData} />
      </DndProvider>
    </div>
  );
}

export default DashboardPage;
