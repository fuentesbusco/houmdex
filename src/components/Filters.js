import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const Filters = props => {
    const [abilities, setAbilities] = useState([]);
    const [types, setTypes] = useState([]);
    const [generations, setGenerations] = useState([]);

    const setError = error => {
        props.setError(error);
    }

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const getTypes = async () => {
            try {
                let result = await axios.get(`https://pokeapi.co/api/v2/ability?limit=400`, { cancelToken: source.token });
                setAbilities(result.data.results);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("axios cancelled");
                } else {
                    if (error.response) {
                        setError("Ha ocurrido un error en el servidor");
                    } else if (error.request) {
                        setError("Verifique la conexión a internet");
                    } else {
                        setError("Error al cargar datos");
                    }
                }
            }
        }

        getTypes();

        return () => {
            source.cancel();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const getTypes = async () => {
            try {
                let result = await axios.get(`https://pokeapi.co/api/v2/type`, { cancelToken: source.token });
                setTypes(result.data.results);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("axios cancelled");
                } else {
                    if (error.response) {
                        setError("Ha ocurrido un error en el servidor");
                    } else if (error.request) {
                        setError("Verifique la conexión a internet");
                    } else {
                        setError("Error al cargar datos");
                    }
                }
            }
        }

        getTypes();

        return () => {
            source.cancel();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const getGenerations = async () => {
            try {
                let result = await axios.get(`https://pokeapi.co/api/v2/generation`, { cancelToken: source.token });
                setGenerations(result.data.results);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("axios cancelled");
                } else {
                    if (error.response) {
                        setError("Ha ocurrido un error en el servidor");
                    } else if (error.request) {
                        setError("Verifique la conexión a internet");
                    } else {
                        setError("Error al cargar datos");
                    }
                }
            }
        }

        getGenerations();

        return () => {
            source.cancel();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeType = (event) => {
        props.handleChangeType(event.target.value);
    };

    const handleChangeGeneration = (event) => {
        props.handleChangeGeneration(event.target.value);
    };

    const handleChangeAbility = (event) => {
        props.handleChangeAbility(event.target.value);
    };

    return (
        <FormGroup>
            <Card className={props.classes.root} style={{margin: 0}}>
                <CardContent>
                    <Typography className={props.classes.title} color="textSecondary" gutterBottom>
                        Filters (Because API limitations you must choose only one filter at the time)
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6} lg={3}>
                            <FormControl margin="none" className={props.classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={handleChangeType}
                                    value={props.typeUrl}
                                >
                                    <MenuItem key={"all"} value={"all"} primarytext={"all"}>
                                        all
                                    </MenuItem>
                                    {
                                        types && types.map((type) =>
                                            <MenuItem key={type.name} value={type.url} primarytext={type.name}>
                                                {type.name}
                                            </MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormControl margin="none" className={props.classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Generation</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={handleChangeGeneration}
                                    value={props.generationUrl}
                                >
                                    <MenuItem key={"all"} value={'all'} primarytext={"all"}>
                                        all
                                    </MenuItem>
                                    {
                                        generations && generations.map((generation) =>
                                            <MenuItem key={generation.name} value={generation.url} primarytext={generation.name}>
                                                {generation.name}
                                            </MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormControl margin="none" className={props.classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Ability</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={handleChangeAbility}
                                    value={props.abilityUrl}
                                >
                                    <MenuItem key={"all"} value={'all'} primarytext={"all"}>
                                        all
                                    </MenuItem>
                                    {
                                        abilities && abilities.map((ability) =>
                                            <MenuItem key={ability.name} value={ability.url} primarytext={ability.name}>
                                                {ability.name}
                                            </MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    
                        <Grid item xs={12} md={6} lg={3}>
                            <FormControl margin="none" className={props.classes.formControl}>
                                <Button size="small" variant="contained" color="primary" onClick={props.handleClickFilter} className={props.classes.button}>Ok</Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </FormGroup>
    );
}

export default Filters;