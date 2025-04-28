import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { createUser } from '../../services/api';
import { successToast, errorToast } from '../../utils/toast';
import { User } from '../../types/User';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  status: z.enum(['active', 'locked']),
});

type FormData = z.infer<typeof schema>;

const NewUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (newUser: Partial<User>) => createUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      successToast('User created successfully');
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Error creating user:', error); // Log the error if it occurs
      errorToast('Error creating user');
    },
  });
  
  

  const onSubmit = (data: FormData) => {
    console.log('Form submitted with data:', data); 
    mutation.mutate(data);
  };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('firstName')} placeholder="First Name" className="input" />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

        <input {...register('lastName')} placeholder="Last Name" className="input" />

        <input {...register('email')} placeholder="Email" className="input" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input {...register('dateOfBirth')} type="date" className="input" />
        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}

        <select {...register('status')} className="input">
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="locked">Locked</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}

        <button type="submit" className="btn-primary">Create User</button>
      </form>
    </div>
  );
};

export default NewUser;
