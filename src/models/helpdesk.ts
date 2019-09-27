import * as Knex from 'knex';

export class HelpdeskModel {

  getlist(db: Knex, limit, offset, order, period) {
    const _period = `%${period}%`;
    return db('helpdesk as h')
      .select('h.*', 's.status', 'u.nickname')
      .join('status as s', 'h.status_id', 's.id')
      .join('users as u', 'u.id', 'h.create_id')
      .orderBy('h.status_id', order)
      .orderBy('h.id', 'desc')
      .where('h.create_date', 'like', _period)
      .limit(limit)
      .offset(offset);
  }

  getlistTotal(db: Knex, period) {
    const _period = `%${period}%`;
    return db('helpdesk as h')
      .count('* as count')
      .join('status as s', 'h.status_id', 's.id')
      .join('users as u', 'u.id', 'h.create_id')
      .orderBy('h.status_id')
      .where('h.create_date', 'like', _period);
  }

  getCount(db: Knex, period) {
    const _period = `%${period}%`;
    return db('helpdesk')
      .count('* as count')
      .select('status_id')
      .groupBy('status_id')
      .where('create_date', 'like', _period);
  }

  save(db: Knex, data) {
    return db('helpdesk')
      .insert(data);
  }

  chageStatus(db: Knex, id, statusId) {
    return db('helpdesk as h')
      .where('id', id)
      .update('status_id', statusId)
  }

  update(db: Knex, id, data) {
    return db('helpdesk as h')
      .where('id', id)
      .update(data);
  }

  getCountUser(db: Knex, period) {
    const _period = `%${period}%`;
    return db('helpdesk as h')
      .count('* as count').select('u.nickname')
      .join('users as u', 'h.create_id', 'u.id')
      .groupBy('h.create_id')
      .where('u.is_admin', 'N')
      .where('h.create_date', 'like', _period)
  }

  getCountSubject(db: Knex) {
    return db('helpdesk as h')
      .count('* as count').select('u.nickname')
      .join('users as u', 'h.create_id', 'u.id')
      .where('u.is_admin', 'N')
  }

}