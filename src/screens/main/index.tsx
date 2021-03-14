import {Component} from 'react'
import {Grid} from '@material-ui/core';
import {Pagination, Alert} from '@material-ui/lab';
import LaunchCard from '../../components/LaunchCard'
import LaunchService, {Launch}  from "../../services/LaunchService"
import SearchBar from '../../components/Searchbar';
import styles from "./index.module.css"

const CARDS_PER_PAGE = 10;

interface IState{
    allLaunches: Launch[];
    displayLaunches: Launch[];
    page: number;

}

class Main extends Component<any, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            allLaunches: [],
            displayLaunches: [],
            page: 1
            
        };
    }    

    async getLaunches() {
        const launches = await LaunchService.listLaunches()
        return launches.items.map(launch => LaunchService.formatLaunch(launch))
    }

    async componentDidMount(){
        const launches = await this.getLaunches()
        this.setState({allLaunches: launches, displayLaunches: launches})

    }

    setDisplayLaunches = (launches: Launch[]) => {
        this.setState({displayLaunches: launches, page:1})
    }

    handleChangePagination = (event:any, value:number) => {
        this.setState({page: value});
      };
    render(){
        const ADD_CARDS_WHEN_HANDLE = (CARDS_PER_PAGE * (this.state.page - 1));

        return(
            <div className={styles.content}>
                <h1 className={styles.title}>Space X - Past Launches</h1>
                <SearchBar allLaunches={this.state.allLaunches} setDisplayLaunches={this.setDisplayLaunches} />
                <Grid container style={{flexGrow:1, maxWidth:"100%"}} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={8}>
                            {this.state.displayLaunches.length > 0 ? 
                                this.state.displayLaunches.slice(0 + ADD_CARDS_WHEN_HANDLE, 10+ADD_CARDS_WHEN_HANDLE).map(launch => (
                                    <Grid item key={launch.id}>
                                        <LaunchCard launch={launch} />
                                    </Grid>
                                ))
                                :
                                <Alert style={{marginTop: "20px"}} severity="warning"> Launch not found </Alert>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Pagination
                    className={styles.pagination} 
                    color="primary" 
                    count={Math.round(this.state.displayLaunches.length/CARDS_PER_PAGE)} 
                    page={this.state.page} onChange={(event, value) => this.handleChangePagination(event, value)} 
                />
            </div>
        )
    }
}

export default Main;