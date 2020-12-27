import { Grid, Typography, Box } from '@material-ui/core'
import { object } from 'joi'
import React from 'react'
import Permission from '../../components/account/Permission'
import BaseTable from '../../components/genaral-component/BaseTable'

export default function Role() {
    return (
        <Grid xs={12}>
			<Grid>
				<Typography variant={"h1"}>Xe</Typography>
			</Grid>
			<Permission
                onPermissions = {()=>{}}
                permissions = {[]}
                title = {"AA"}
            ></Permission>
		</Grid>
    )
}
