import React, { useEffect } from 'react';
//import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Error = props => {
    //const [data, setData] = useState(null);
    //const [error, setError] = useState(null);

    useEffect(() => {
        /*const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const getMachineCode = async () => {
            try {
                let result = await axios.get(`sensors/machine_code.txt`, { cancelToken: source.token });
                if (result.data) {
                    result.data = result.data.replace(/(\r\n|\n|\r)/gm,"");
                }
                localStorage.setItem('machineCode', result.data);
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

        getMachineCode();

        return () => {
            source.cancel();
        }
    */
    },[]);

    useEffect(() => {
        //const CancelToken = axios.CancelToken;
        //const source = CancelToken.source();
    }, []);

    return (
        <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh', height: "100vh", backgroundSize: 'cover' }}
        >
            <Grid item xs={12}>
                <Typography style={{ textAlign: 'center', color: 'white', fontSize: '2.8em' }}>Error</Typography>
            </Grid>   
        </Grid>
    );
}

export default Error;