import React from 'react';
import { Form, Field } from 'formik';
import { Box, TextField, Button } from '@mui/material';

export default ({ mode = "create", errors, touched }) => (
    <Form>
        <Field
            as={TextField}
            required
            fullWidth
            margin="normal"
            id="name"
            name="name"
            label="Name"
            autoFocus
            error={errors.name && touched.name}
            helperText={touched.name && errors.name}
        />
        <Field
            as={TextField}
            required
            fullWidth
            margin="normal"
            id="icon"
            name="icon"
            label="Icon"
            autoFocus
            error={errors.icon && touched.icon}
            helperText={touched.icon && errors.icon}
        />
        <Box
            sx={{
                marginBottom: 4,
                display: 'flex',
                justifyContent: 'flex-end',
            }}
        >
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {mode === "create" ? "Create" : "Update"}
            </Button>
        </Box>
    </Form>
);