import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
   
} from "../../../components/ui/alert-dialog"
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import { Button } from '../../../components/ui/button';
function AiOutputDialog({ openDialog,closeDialog,orgImage,aiImage }) {
    return (
        <AlertDialog open={openDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Result: </AlertDialogTitle>
                    <ReactBeforeSliderComponent
                        firstImage={{
                            imageUrl:orgImage
                        }}
                        secondImage={{
                            imageUrl:aiImage
                        }}
                    />
                    <Button className='bg-violet-500' onClick = {()=>closeDialog(false)}>Close</Button>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AiOutputDialog
