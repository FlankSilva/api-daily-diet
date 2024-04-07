import { afterAll, beforeAll, describe, beforeEach, it, expect } from 'vitest'
import { app } from '../app'
import { execSync } from 'child_process'
import request from 'supertest'

describe('Users routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new user', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({ name: 'John Doe', email: 'b0S5Z@example.com' })
      .expect(201)

    const cookies = response.get('Set-Cookie')

    console.log(`cookies: ${cookies}`);
    

    expect(cookies).toEqual(
      expect.arrayContaining([expect.stringContaining('sessionId')])
    )
  })
})