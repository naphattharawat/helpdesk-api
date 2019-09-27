/// <reference path="../../typings.d.ts" />

import * as HttpStatus from 'http-status-codes';
import * as moment from 'moment';

import * as express from 'express';
import { Router, Request, Response } from 'express';

import { HelpdeskModel } from '../models/helpdesk';

const helpdeskModel = new HelpdeskModel();
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const limit = +req.query.limit;
    const offset = +req.query.offset;
    const order = req.query.order;
    const period = req.query.period;
    const rs = await helpdeskModel.getlist(db, limit, offset, order, period);
    const count = await helpdeskModel.getlistTotal(db, period);
    res.send({ ok: true, rows: rs, total: count[0].count });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});


router.get('/count', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const period = req.query.period;
    const rs = await helpdeskModel.getCount(db, period);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.get('/count-user', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const period = req.query.period;
    const rs = await helpdeskModel.getCountUser(db, period);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const data = req.body.data;
    console.log(data);

    const rs = await helpdeskModel.save(db, data);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const id = req.body.id;
    const data = req.body.data;
    const rs = await helpdeskModel.update(db, id, data);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

// save new request
// router.post('/request', async (req: Request, res: Response) => {
//   let code = moment().format('x');
//   let cause = req.body.cause;
//   let customerId = req.decoded.id;
//   let requestDate = moment().format('YYYY-MM-DD');
//   let requestTime = moment().format('HH:mm:ss');

//   let data: any = {};
//   data.request_code = code;
//   data.request_cause = cause;
//   data.customer_id = customerId;
//   data.request_date = requestDate;
//   data.request_time = requestTime;

//   try {
//     await requestModel.saveRequest(req.db, data);
//     res.send({ ok: true, code: HttpStatus.OK });
//   } catch (error) {
//     res.send({ ok: false, error: error.message, code: HttpStatus.OK });
//   }

// });

export default router;