import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import ElectronStore from 'electron-store';
import React from 'react';
//import consumerController from './consumerController';

const schema:any = {
  port: {
    type: 'string',
  },
  nickname: {
    type: 'string',
  }
}

const db = new ElectronStore({schema});
//çconsole.log("electronStore DB", db);
const promPortController = {
  async isPromPortUp(req: Request, res: Response, next: NextFunction) {
    const { port } = req.body;
    // https://stackoverflow.com/questions/12968093/regex-to-validate-port-number#comment89586361_12968117
    const convertStringToNum = Number(port);
    if (!Number.isInteger(convertStringToNum) || convertStringToNum < 0 || convertStringToNum > 65535) {
      return res.status(400).json({error: 'Expected an integer from 0 to 65535.'});
    }
    try {
      const { data } = await axios.get(`http://localhost:${port}/api/v1/query?query=up`);
      if (data.status === 'success') {
        return next();
      }
      return res.status(404).json({error: `Prometheus doesn't seem to be running on port ${port}!`})
    } catch (e) {
      return next(e);
    }
  },
  savePortToElectronStore(req: Request, res: Response, next: NextFunction) {
    const { port, nickname } = req.body;
    db.set('port', port);
    db.set('nickname', nickname);
    return next();
  },
  
  getSavedPortFromElectronStore(req: Request, res: Response, next: NextFunction) {
    const port = db.get('port');
    res.locals.port = port;
    return next();
  }
}
export default promPortController;