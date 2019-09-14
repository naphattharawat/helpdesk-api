import * as Knex from 'knex';

export class HelpdeskModel {

  getlist(db: Knex, limit, offset, order) {
    return db('helpdesk as h')
      .select('h.*', 's.status', 'u.nickname')
      .join('status as s', 'h.status_id', 's.id')
      .join('users as u', 'u.id', 'h.create_id')
      .orderBy('h.status_id', order)
      .limit(limit)
      .offset(offset);
  }

  getlistTotal(db: Knex) {
    return db('helpdesk as h')
      .count('* as count')
      .join('status as s', 'h.status_id', 's.id')
      .join('users as u', 'u.id', 'h.create_id')
      .orderBy('h.status_id')
  }

  getCount(db: Knex) {
    return db('helpdesk')
      .count('* as count')
      .select('status_id')
      .groupBy('status_id');
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

}