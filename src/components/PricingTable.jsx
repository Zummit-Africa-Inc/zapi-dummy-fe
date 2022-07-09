import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Button } from '@mui/material';
import { useSubscriptionService } from '../services/subscriptionService';
import { useUnSubscribeService } from '../services/unsubscribeService';


const base_url = process.env.REACT_APP_BASE_URL

function createData(status, search, features, payperuse, freetouse) {
  return { status, search, features, payperuse, freetouse };
}

const rows = [
  createData('Status (Related Endpoints)'),
  createData('Search (Related Endpoints)', '600 / month', '50, 000 / month', '100, 000 / month', 'Unlimited'),
  createData('Features'),
  createData('Pay Per Use', 'X', 'X', 'X', 'X'),
  createData('Free To Use', 'X', 'X', 'X', 'X'),
  createData('Rate Limit', '', '', '', '12000 requests per hour'),
];

export default function BasicTable() {
  const [buttonSwitch, setButtonSwitch] = useState(true);
  const [buttonSwitchPro, setButtonSwitchPro] = useState(true);
  const [buttonSwitchUltra, setButtonSwitchUltra] = useState(true);
  const [buttonSwitchMega, setButtonSwitchMega] = useState(true);
  const { user } = useSelector(store => store.user)
  const { postSubscription } = useSubscriptionService()
  const { postUnSubscribe } = useUnSubscribeService()
  const { id } = useParams()
  const profileId = user.profileId
  const apiId = id

  const payload = { profileId, apiId }

  const toggleButton = async (e) => {
    e.preventDefault()
    setButtonSwitch(!buttonSwitch);
    try {
      const data = await postSubscription(payload)
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const unsubButton = async(e) => {
    e.preventDefault()
    setButtonSwitch(!buttonSwitch)
    try {
      const data = await postUnSubscribe(payload)
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const toggleButtonPro = async (e) => {
    e.preventDefault()
    setButtonSwitchPro(!buttonSwitchPro)
    try {
      const data = await postSubscription(payload)
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const unsubButtonPro = async(e) => {
    e.preventDefault()
    setButtonSwitchPro(!buttonSwitchPro)
    try {
      const data = await postUnSubscribe(payload)
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const toggleButtonUltra = async (e) => {
    e.preventDefault()
    setButtonSwitchUltra(!buttonSwitchUltra)
    try {
      const data = await postSubscription(payload)
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const unsubButtonUltra = async(e) => {
    e.preventDefault()
    setButtonSwitchUltra(!buttonSwitchUltra)
    try {
      const data = await postUnSubscribe(payload)
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const toggleButtonMega = async (e) => {
    e.preventDefault()
    setButtonSwitchMega(!buttonSwitchMega)
    try {
      const data = await postSubscription(payload)
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const unsubButtonMega = async(e) => {
    e.preventDefault()
    setButtonSwitchMega(!buttonSwitchMega)
    try {
      const data = await postUnSubscribe(payload)
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Objects</TableCell>
            <TableCell sx={{ fontSize: 25, lineHeight: 1.5 }} align="center">
              Basic <br /> $0.00 / mo <br />
              {buttonSwitch && (<Button variant='contained' onClick={toggleButton}>
                Subscribe
              </Button>)}
              {!buttonSwitch && (<Button variant='contained' onClick={unsubButton}>
                Unsubscribe
              </Button>)}
            </TableCell>
            <TableCell sx={{ fontSize: 25, lineHeight: 1.5 }} align="center">
              Pro <br /> $100.00 / mo <br />
              {buttonSwitchPro && (<Button variant='contained' disabled onClick={toggleButtonPro}>
                Subscribe
              </Button>)}
              {!buttonSwitchPro && (<Button variant='contained' disabled onClick={unsubButtonPro}>
                UnSubscribe
              </Button>)}
            </TableCell>
            <TableCell sx={{ fontSize: 25, lineHeight: 1.5 }} align="center">
              Ultra <br /> $200.00 / mo <br />
              {buttonSwitchUltra && (<Button variant='contained' disabled onClick={toggleButtonUltra}>
                Subscribe
              </Button>)}
              {!buttonSwitchUltra && (<Button variant='contained' disabled onClick={unsubButtonUltra}>
                UnSubscribe
              </Button>)}
            </TableCell>
            <TableCell sx={{ fontSize: 25, lineHeight: 1.5 }} align="center">
              Mega <br /> $700.00 / mo  <br />
              {buttonSwitchMega && (<Button variant='contained' disabled onClick={toggleButtonMega}>
                Subscribe
              </Button>)}
              {!buttonSwitchMega && (<Button variant='contained' disabled onClick={unsubButtonMega}>
                UnSubscribe
              </Button>)}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.status}
              </TableCell>
              <TableCell align="right">{row.search}</TableCell>
              <TableCell align="right">{row.features}</TableCell>
              <TableCell align="right">{row.payperuse}</TableCell>
              <TableCell align="right">{row.freetouse}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



//
// Sample for Subscription endpoint
//
// const pricingSub = async () => {
//   const res = await axios.post('api/subsription/subscribe', { name: fields.name })
//   console.log(res.data)
// }

// <div>
//   <Button onClick={() => pricingSub()}>Subscribe</Button>
// </div>
