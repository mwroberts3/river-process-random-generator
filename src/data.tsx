export type TaskType = { id: number | string, task: string, categories: string[], timesPerWeek: number, className: string, timeFrame: string, minEstimate: number, active: boolean };

export const sampleData = [
  {
    id: 1,
    task: 'Task 1',
    categories: [
      'Category 1',
      'Sub Cat A'
    ],
    timesPerWeek: 3,
    minEstimate: 20,
    color: 'blue',
    active: 1
  },
  {
    id: 2,
    task: 'Task 2',
    categories: [
      'Category 1',
      'Sub Cat B'
    ],
    timesPerWeek: 1,
    minEstimate: 10,
    color: 'blue',
    active: 1
  },
  {
    id: 3,
    task: 'Task 3',
    categories: [
      'Category 2',
      'Sub Cat A'
    ],
    timesPerWeek: 2,
    minEstimate: 60,
    color: 'green',
    active: 1
  },
  {
    id: 4,
    task: 'Task 4',
    categories: [
      'Category 3',
      'Sub Cat A'
    ],
    timesPerWeek: 3,
    minEstimate: 15,
    color: '',
    active: 1
  },
  {
    id: 5,
    task: 'Task 5',
    categories: [
      'Category 3',
      'Sub Cat A'
    ],
    timesPerWeek: 3,
    minEstimate: 5,
    color: '',
    active: 1
  },
  {
    id: 6,
    task: 'Task 6',
    categories: [
      'Category 3',
      'Sub Cat B'
    ],
    timesPerWeek: 4,
    minEstimate: 10,
    color: '',
    active: 1
  }
]