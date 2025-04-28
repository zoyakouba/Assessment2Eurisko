import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as z from 'zod';
import { getUserById, updateUser } from '../../services/api';
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

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: (updatedUser: Partial<User>) => updateUser(id!, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      successToast('User updated successfully');
      navigate('/dashboard');
    },
    onError: () => errorToast('Error updating user'),
  });

  const onSubmit = (formData: FormData) => mutation.mutate(formData);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('firstName')} placeholder="First Name" className="input" />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

        <input {...register('lastName')} placeholder="Last Name" className="input" />

        <input {...register('email')} placeholder="Email" className="input" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input {...register('dateOfBirth')} type="date" className="input" />
        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}

        <select {...register('status')} className="input">
          <option value="active">Active</option>
          <option value="locked">Locked</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}

        <button type="submit" className="btn-primary">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
