import {
    Clear as ClearIcon,
    DragIndicator as DragIcon
} from '@mui/icons-material';
import {
    Box,
    Button,
    IconButton,
    Stack,
    TextField
} from '@mui/material';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import uuid from 'react-uuid';
import { reorder } from 'src/utils/utils';
import styles from './RecipeStep.module.css';

const RecipeStep = forwardRef(({ step, onChange, onDelete, dragHandleProps, ...props }, ref) => {
  const { t } = useTranslation();
  
  const handleChange = (e) => {
    onChange({
      ...step,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddInstructionClick = () => {
    const newInstructions = [...step.instructions];
    newInstructions.push({
      id: uuid(),
      instruction: ""
    })

    onChange({
      ...step,
      instructions: newInstructions
    });
  };

  const handleInstructionChange = (id, value) => {
    const newInstructions = [...step.instructions];

    const index = newInstructions.findIndex((x) => x.id === id);

    newInstructions[index].instruction = value;

    onChange({
      ...step,
      instructions: newInstructions
    });
  }

  const handleRemoveInstruction = (id) => {
    const newInstructions = step.instructions.filter(x => x.id !== id);

    onChange({
      ...step,
      instructions: newInstructions
    });
  }

  const handleInstructionDragEnd = (result) => { 
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newInstructions = reorder(
      step.instructions,
      result.source.index,
      result.destination.index
    );

    onChange({
      ...step,
      instructions: newInstructions
    });
  }
  
  return (
    <Box sx={{ pb: 2 }} className={styles.step} ref={ref} {...props}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Box
          display="flex"
          alignItems="center"
          {...dragHandleProps}
        >
          <DragIcon className={styles.dragIcon} />
        </Box>

        <Stack direction="row" gap={10} display="flex" justifyContent="space-between" alignItems="center">        
          <TextField
            fullWidth
            id="name"
            label={t("types.recipe.fields.steps.fields.name.name")}
            name="name"
            value={step.name}
            onChange={handleChange}
          />
          
          <IconButton onClick={() => onDelete(step)}>
            <ClearIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={{ ml: 2 }}>
        <DragDropContext onDragEnd={handleInstructionDragEnd}>
          <Droppable droppableId="droppable-instructions" direction="vertical">
            {(provided, snapshot) => (
              <Stack sx={{ mt: 2 }} direction="column" gap={2}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {step.instructions.map((instruction, index) => (
                  <Draggable key={instruction.id} draggableId={instruction.id} index={index}>
                    {(provided, snapshot) => (
                      <Stack
                        ref={provided.innerRef}
                        direction="row"
                        gap={1}
                        alignItems="center"
                        {...provided.draggableProps}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          {...provided.dragHandleProps}
                        >
                          <DragIcon className={styles.dragIcon} />
                        </Box>
                        
                        <TextField
                          fullWidth
                          multiline
                          required
                          value={instruction.instruction}
                          onChange={(e) => handleInstructionChange(instruction.id, e.target.value)}
                          label={t("types.recipe.fields.steps.instructions.fields.instruction.name")}
                          id="instruction"
                        />

                        <IconButton onClick={() => handleRemoveInstruction(instruction.id)}>
                          <ClearIcon />
                        </IconButton>
                      </Stack>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext> 
        
        <Button sx={{ mt: 2 }} type="button" onClick={handleAddInstructionClick} variant="contained">
          {`${t("common.words.actions.add")} ${t("types.recipe.fields.steps.instructions.singularName")}`}
        </Button>
      </Box>
    </Box>
  );
});

RecipeStep.propTypes = {
  step: PropTypes.shape({
    name: PropTypes.string,
    instructions: PropTypes.arrayOf(PropTypes.shape({
      instruction: PropTypes.string
    })),
  }).isRequired,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

RecipeStep.defaultProps = {
  onChange: () => { },
  onDelete: () => { },
};

export default RecipeStep