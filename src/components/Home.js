import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import Filters from './Filters';
import DataList from './DataList';
import Detail from './Detail';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: '5%',
    },
    media: {
      height: 140,
      backgroundSize: 'contain !important',
    },
    avatar: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
      },
      cardWithoutBorder: {
        border: "none",
        boxShadow: "none",
        minWidth: 275,
    },
    formControl: {
        margin: 0,
        fullWidth: true,
        display: 'flex',
        wrap: 'nowrap',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
    button: {
        backgroundColor: 'rgb(255, 80, 0)',
        '&:hover': {
            backgroundColor: 'rgb(255, 80, 0)',
        },
        color: 'white',
    },
    cardSubheader: {
        fontSize: '14px',
    },
    cardTitle: {
        fontWeight: '600',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
    },
  }));

const filterDefautlValue = "all";

const Home = props => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(true);
    const [error, setError] = useState(null);
    const [dialogData, setDialogData] = useState({});
    const [typeUrl, setTypeUrl] = useState("all");
    const [generationUrl, setGenerationUrl] = useState("all");
    const [abilityUrl, setAbilityUrl] = useState("all");
    const [search, setSearch] = useState(null); 

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        setError(null);

        const getData = async () => {
            try {
                const itemList = [];
                let requestUrl = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`;
                if (typeUrl != null && typeUrl !== 'all') {
                    requestUrl = typeUrl;
                } else if (generationUrl != null && generationUrl !== 'all') {
                    requestUrl = generationUrl;
                } else if (abilityUrl != null && abilityUrl !== 'all') {
                    requestUrl = abilityUrl;
                }

                let result = await axios.get(requestUrl, { cancelToken: source.token });
                let results = [];

                if (typeUrl != null && typeUrl !== 'all') {
                    results = result.data.pokemon;
                } else if (generationUrl != null && generationUrl !== 'all') {
                    results = result.data.pokemon_species;
                } else if (abilityUrl != null && abilityUrl !== 'all') {
                    results = result.data.pokemon;
                } else {
                    results = result.data.results;
                }

                if (results) {
                    let i = 0;
                    for(let item of results) {
                        if (i === 10) {
                            break;
                        }
                        if (typeUrl != null && typeUrl !== 'all') {
                            item = item.pokemon;
                        } else if (abilityUrl != null && abilityUrl !== 'all') {
                            item = item.pokemon;
                        } else if (generationUrl != null && generationUrl !== 'all') {
                            item.url = item.url.replace("-species", "");
                        }
                        let detail = await axios.get(item.url, { cancelToken: source.token });
                        detail.data.name = detail.data.name.charAt(0).toUpperCase() + detail.data.name.slice(1);

                        for (const stat of detail.data.stats) {
                            if (stat.stat.name === 'hp') {
                                detail.data.hp = `HP ${stat.base_stat}`;
                            }
                        }

                        const types = [];
                        for (const type of detail.data.types) {
                            type.type.name = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
                            types.push(type.type.name);
                            if (!detail.data.default_type) {
                                detail.data.default_type = type.type.name;
                                detail.data.default_type_icon = `/static/images/types/Icon_${type.type.name}.png`;
                            }
                        }
                        detail.data.types = types;

                        const abilities = [];
                        for (const ability of detail.data.abilities) {
                            ability.ability.name = ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1);
                            abilities.push(ability.ability.name);
                        }
                        detail.data.abilities = abilities;

                        itemList.push(detail.data);
                        i++;
                    }
                }

                setData(itemList);
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
            setOpenBackdrop(false);
        }

        getData();

        return () => {
            source.cancel();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const clickDetailsHandler = (item) => {
        setOpen(true);
        setDialogData(item);
    }

    const clearFilterValues = () => {
        setTypeUrl(filterDefautlValue);
        setGenerationUrl(filterDefautlValue);
        setAbilityUrl(filterDefautlValue);
    }

    const handleChangeType = (url) => {
        clearFilterValues();
        setTypeUrl(url);
    };

    const handleChangeGeneration = (url) => {
        clearFilterValues();
        setGenerationUrl(url);
    };

    const handleChangeAbility = (url) => {
        clearFilterValues();
        setAbilityUrl(url);
    };

    const handleClickFilter = () => {
        setOpenBackdrop(true);
        setData([]);
        setSearch(Math.random());
    }

    return (
        <Grid
        container
        spacing={0}
        direction="row"
        > 
            <Grid container spacing={4}>
                {
                    error &&
                    <Grid item xs={12} md={12} lg={12}>
                        <Alert severity="error">{error}</Alert>
                    </Grid>
                }
                <Grid item xs={12} md={12} lg={12}>
                    <Paper elevation={3}>
                        <Filters 
                            handleClickFilter={handleClickFilter} 
                            handleChangeType={handleChangeType} 
                            handleChangeGeneration={handleChangeGeneration} 
                            handleChangeAbility={handleChangeAbility} 
                            typeUrl={typeUrl}
                            generationUrl={generationUrl}
                            abilityUrl={abilityUrl}
                            classes={classes}
                            setError={setError}
                        />
                    </Paper>
                </Grid>
                { data && data.map((item) =>
                    <DataList 
                        item={item} 
                        key={item.name}
                        clickDetailsHandler={clickDetailsHandler} 
                        classes={classes}
                    />
                )}
                <Detail 
                    item={dialogData} 
                    open={open} 
                    handleClose={handleClose}
                    classes={classes} />
            </Grid>
            <Backdrop className={classes.backdrop} open={openBackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Grid>
    );
}

export default Home;