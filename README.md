# Quasar App

### Schema

#### Student
```
{
  id: 1,
  name: 'Joe',
  document: 'xxx.xxx.xxx-xx',
  modality: ['Kung Fu', 'Tai Chi'],
  payments: [id1, id2, id3, ...],
}
```

#### Payment
```
{
  id: 1,
  dueDate: 'Joe',
  paid: false,
  amount: 100.00,
  modality: 'Kung Fu',
}
```

#### Modalities
* Kung Fu
* Sanda
* Tai Chi
