import React, { useEffect, useState } from 'react';
import {TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FileBase from 'react-file-base64';
import useStyles from './PollForm.styles';
import {useDispatch, useSelector} from 'react-redux';
import {createPostsAsync} from '../../store/Post/post.action'
import {selectPosts} from '../../store/Post/post.selector';
import { selectCurrentSpace } from '../../store/DisscusionSpace/DS.selector';


const NewPollForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const postArray = useSelector(selectPosts);
    const discussionSpace = useSelector(selectCurrentSpace);
    const INITIAL_STATE = { question: '', selectedFile: null, options: [{ option: '' }] }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [currentSpace, setCurrentSpace] = useState(discussionSpace);

    useEffect( () => {
        setCurrentSpace(discussionSpace);
    } , [discussionSpace]);

    const handleQuestionChange = (event) => {
        setFormData({ ...formData, question: event.target.value });
    };
    const handleOptionChange = (index) => (event) => {
        const newOptions = [...formData.options];
        newOptions[index].option = event.target.value;
        setFormData({ ...formData, options: newOptions });
    };

    const addOption = () => {
        setFormData({ ...formData, options: [...formData.options, { option: '' }] });
    };

    const removeOption = (index) => () => {
        const newOptions = [...formData.options];
        newOptions.splice(index, 1);
        setFormData({ ...formData, options: newOptions });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createPostsAsync(currentSpace, formData, postArray));
        setFormData(INITIAL_STATE);
    };

    return (
        <Grid container className={classes.formContainer}>            
            <Grid item xs={12}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        label="Question"
                        name="question"
                        value={formData.question}
                        onChange={handleQuestionChange}
                        variant="outlined"
                        required={formData.selectedFile?false:true}
                        fullWidth={true}
                    />
                    <div className={classes.optionContainer}>
                        {formData.options.map((option, index) => (
                            <TextField
                                key={index}
                                label={`Option ${index + 1}`}
                                value={option.option}
                                onChange={handleOptionChange(index)}
                                variant="outlined"
                                fullWidth
                                required
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <Button
                                            size="small"
                                            color="secondary"
                                            onClick={removeOption(index)}
                                            disabled={formData.options.length <= 1}
                                        >
                                            {formData.options.length > 1 && "Remove"}
                                        </Button>
                                    ),
                                }}
                            />
                        ))}
                    </div>
                    <div className={classes.fileInput}>
                        <FileBase
                            type="file"
                            multiple={false}
                            value={formData.selectedFile}
                            onDone={({ base64 }) => setFormData({ ...formData, selectedFile: base64 })} />
                    </div>
                    <Button
                        className={classes.addOptionButton}
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={addOption}
                    >
                        Add Option
                    </Button>
                    <Button
                        className={classes.submitButton}
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Submit
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
};

export default NewPollForm;


