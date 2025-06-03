import { Request, Response, NextFunction } from 'express';
import { collections } from '../database';
import { ObjectId } from 'mongodb';
import { Employee } from '../employee';

export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employees = await collections.employees?.find({}).toArray();
    res.status(200).send(employees);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const getEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const employee = await collections.employees?.findOne(query);

    if (employee) {
      res.status(200).send(employee);
    }else {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find an employee: ID ${id}`);
  }
};

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newEmployee = req.body as Employee;
    const { level, position, name } = newEmployee;
    const result = await collections.employees?.insertOne({
      name,
      level,
      position,
    });

    result?.acknowledged
      ? res
          .status(201)
          .send(
            `Successfully created a new employee with id ${result.insertedId}`
          )
      : res.status(500).send('Failed to create a new employee.');
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req?.params?.id;

  try {
    const updatedEmployee: Employee = req.body as Employee;
    const query = { _id: new ObjectId(id) };

    const result = await collections.employees?.updateOne(query, {
      $set: updatedEmployee,
    });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an employee: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an employee: ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.employees?.deleteOne(query); // SQL: delete from employees where id = req.params.id 

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an employee: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an employee: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : 'Unknown error');
  }
};
