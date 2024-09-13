import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'


async function seed() {
    await db.delete(goalCompletions)
    await db.delete(goals)

    const result = await db
    
    .insert(goals)
    .values([
        { title: 'Learn to cook', desiredWeeklyFrequency: 3 },
        { title: 'Learn to dance', desiredWeeklyFrequency: 2 },
        { title: 'Learn to code', desiredWeeklyFrequency: 5 },
    ])
    
    .returning()

    const startOfWeek = dayjs().startOf('week')

    await db.insert(goalCompletions).values([
        { id: '1', goalId: result[0].id, createdAt: startOfWeek.toDate() },
        { id: '2', goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    ])

    }

seed().finally(() => {
    client.end()
})