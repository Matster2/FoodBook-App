import { Clear as ClearIcon, DragIndicator as DragIcon } from '@mui/icons-material';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { forwardRef } from 'react';
import { DragDropContext, Draggable, DraggableProvidedDragHandleProps, DropResult, Droppable } from "react-beautiful-dnd";
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import uuid from 'react-uuid';
import FormTextField from 'src/components/form-components/FormTextField';
import styles from './styles.module.css';

interface FormRecipeStepProps {
  name: string;
  onDelete: () => void;
  dragHandleProps: DraggableProvidedDragHandleProps;
}

const FormRecipeStep = forwardRef(({
  name,
  onDelete,
  dragHandleProps,
  ...props
}: FormRecipeStepProps, ref) => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const { fields: instructions, append: addInstruction, remove: removeInstruction, move: moveInstruction } = useFieldArray({ control, name: "instructions", keyName: "key" });

  /* Handlers */
  const handleInstructionDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    moveInstruction(result.source.index, result.destination.index);
  }

  const handleAddInstructionClick = () => {
    addInstruction({
      id: uuid(),
      instructions: ""
    });
  }

  /* Rendering */
  return (
    <Box ref={ref} {...props}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Box
          display="flex"
          alignItems="center"
          {...dragHandleProps}
        >
          <DragIcon className={styles.dragIcon} />
        </Box>


        <Stack direction="row" alignItems="center" gap={1}>
          <FormTextField
            name={`${name}.name`}
            fullWidth
            label={t("types.recipe.fields.steps.fields.name.name")}
            disabled
          />

          <IconButton onClick={() => onDelete()}>
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
                {instructions.map((instruction, index) => (
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

                        <FormTextField
                          name={`${name}.instructions.${index}.instructions`}
                          fullWidth
                          label={t("types.recipe.fields.steps.instructions.fields.instruction.name")}
                          disabled
                        />

                        <IconButton onClick={() => removeInstruction(index)}>
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

export default FormRecipeStep