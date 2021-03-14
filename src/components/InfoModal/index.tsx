import React, {Component} from 'react';
import {Modal, Button, IconButton} from "@material-ui/core"
import styles from "./index.module.css"
import { Launch } from '../../services/LaunchService';
import {Close, CheckCircle, Cancel} from '@material-ui/icons';
import MenuMore from '../../components/MenuMore'
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";


interface IProps{
    launch: Launch,
    open: boolean,
    handleClose: Function,
}


interface IState {
    anchorEl?: null | HTMLElement;
}


class InfoModal extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            anchorEl: null,
        };
    }

    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    };
    
    handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
    };


    render(){
        const {launch, open, handleClose} = this.props
        return (
            <Modal open={open} className={styles.modalAlign} onClose={() => handleClose()}>
                <div className={styles.modalContent}>
                    <div className={styles.close}>
                        <IconButton style={{padding:0}} onClick={() => handleClose()}>
                            <Close />
                        </IconButton>
                    </div>
                    <div className={styles.columns}>
                        <div className={styles.leftColumn}>
                            <div className={styles.wrapper}>
                                <img src={launch.image} alt="new" className={styles.image}/>
                            </div>
                        </div>
                        <div className={styles.rightColumn}>
                            <span className={styles.title}>{launch.name}</span>
                            <div className={styles.attributes}>
                                <div className={styles.attribute}>
                                    <span className={styles.attributeTitle}>Date</span>
                                    <span className={styles.attributeProp}>{format(parseISO(launch.date), "yyyy/MM/dd HH:mm")} </span>
                                </div>
                                <div className={styles.attribute}>
                                    <span className={styles.attributeTitle}>All cores success</span>
                                    {launch.success ? <CheckCircle fontSize="default" style={{color: "#6DA77D"}}/> : <Cancel fontSize="default" style={{color: "#FF0000"}}/>}
                                </div>
                            </div>
                            <span  className={styles.about}>{launch.details}</span>
                            <Button onClick={(event) => this.handleClickMenu(event)}>
                                <span className={styles.attributeTitle}>More</span>
                            </Button>
                            <MenuMore launch={launch} anchorEL={this.state.anchorEl} handleCloseMenu={this.handleCloseMenu} />
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default InfoModal;