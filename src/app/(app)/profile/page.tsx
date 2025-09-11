
'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Flame, Mail, MapPin, Twitter, Linkedin, Edit, Save, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';
import type { User } from '@/lib/types';

type ProfileFormData = {
    name: string;
    contact: string;
    location: string;
    socials: {
        twitter: string;
        linkedin: string;
    };
};


export default function ProfilePage() {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  
  const { register, handleSubmit, reset, control, formState: { isDirty } } = useForm<ProfileFormData>();

  useEffect(() => {
    if (user && isEditing) {
      reset({
        name: user.name,
        contact: user.contact || '',
        location: user.location || '',
        socials: {
          twitter: user.socials?.twitter || '',
          linkedin: user.socials?.linkedin || '',
        },
      });
    }
  }, [user, isEditing, reset]);


  if (!user) {
    return (
      <div className="container mx-auto">
        <p>Loading user profile...</p>
      </div>
    );
  }

  const handleEditToggle = () => {
    if (isEditing) {
        reset(); // Reset form changes if canceling
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = (data: ProfileFormData) => {
    const updatedUser: Partial<User> = {
        name: data.name,
        contact: data.contact,
        location: data.location,
        socials: {
            twitter: data.socials.twitter,
            linkedin: data.socials.linkedin,
        }
    };
    updateUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto max-w-4xl">
       <div className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">Your Profile</h1>
            <p className="text-muted-foreground text-lg">
            View and manage your personal information.
            </p>
        </div>
        <Button variant="outline" size="icon" onClick={handleEditToggle} className="w-auto px-4 gap-2">
            {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            <span className="hidden sm:inline">{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-3xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isEditing ? (
                  <Input {...register('name')} className="text-2xl text-center font-bold" />
                ) : (
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                )}
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center gap-2 text-primary font-bold">
                  <Flame className="h-6 w-6" />
                  <span className="text-2xl">{user.streak || 0} Day Streak</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-5 h-5" /> Contact Information
                  </h3>
                  {isEditing ? (
                    <Input {...register('contact')} placeholder="your@email.com" />
                  ) : (
                    <p>{user.contact || 'Not provided'}</p>
                  )}
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5" /> Location
                  </h3>
                   {isEditing ? (
                    <Input {...register('location')} placeholder="Your City" />
                  ) : (
                    <p>{user.location || 'Not provided'}</p>
                  )}
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-muted-foreground">
                    <Linkedin className="w-5 h-5" /> Social Profiles
                  </h3>
                   {isEditing ? (
                    <div className="space-y-2">
                         <div className="flex items-center gap-2">
                            <Twitter className="w-5 h-5 text-muted-foreground" />
                            <Input {...register('socials.twitter')} placeholder="twitter_handle" />
                        </div>
                         <div className="flex items-center gap-2">
                            <Linkedin className="w-5 h-5 text-muted-foreground" />
                            <Input {...register('socials.linkedin')} placeholder="linkedin.com/in/..." />
                        </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                        {user.socials?.twitter && (
                        <a
                            href={`https://twitter.com/${user.socials.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-primary"
                        >
                            <Twitter className="w-5 h-5" />
                            <span>{user.socials.twitter}</span>
                        </a>
                        )}
                        {user.socials?.linkedin && (
                        <a
                            href={`https://www.linkedin.com/in/${user.socials.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-primary"
                        >
                            <Linkedin className="w-5 h-5" />
                            <span>LinkedIn</span>
                        </a>
                        )}
                        {!user.socials?.twitter && !user.socials?.linkedin && (
                        <p>Not provided</p>
                        )}
                    </div>
                  )}
                </div>
              </CardContent>
              {isEditing && (
                 <CardFooter className="justify-end">
                    <Button type="submit" disabled={!isDirty}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
