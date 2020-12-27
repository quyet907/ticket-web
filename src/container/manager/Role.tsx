import { Grid, Typography, Box } from '@material-ui/core'
import { object } from 'joi'
import React from 'react'
import Permission from '../../components/account/Permission'
import BaseTable from '../../components/genaral-component/BaseTable'
import Header from '../../components/genaral-component/Header'

export default function Role() {
    return (
        <Grid xs={12}>
			<Header title="Xe" />
			<Permission
                onPermissions = {()=>{}}
                permissions = {[]}
                title = {"AA"}
            ></Permission>
		</Grid>
    )
}
