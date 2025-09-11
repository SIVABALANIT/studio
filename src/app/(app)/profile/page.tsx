
'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Flame, Mail, MapPin, Twitter, Linkedin, Edit, Save, X, Award, Star, Shield, Image as ImageIcon, CircleDollarSign, Fingerprint } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import type { User, Domain } from '@/lib/types';
import { domains } from '@/lib/data';
import { DomainIcon } from '@/components/domain-icon';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type ProfileFormData = {
    name: string;
    avatar: string;
    contact: string;
    location: string;
    socials: {
        twitter: string;
        linkedin: string;
    };
};


const BadgeIcon = ({ level }: { level: 'Basic' | 'Intermediate' | 'Master' }) => {
    switch (level) {
      case 'Basic':
        return <Award className="w-12 h-12 text-amber-600" />;
      case 'Intermediate':
        return <Star className="w-12 h-12 text-slate-500" />;
      case 'Master':
        return <Shield className="w-12 h-12 text-yellow-500" />;
      default:
        return null;
    }
  };


export default function ProfilePage() {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  
  const { register, handleSubmit, reset, formState: { isDirty }, watch } = useForm<ProfileFormData>();

  const avatarUrl = watch('avatar');

  useEffect(() => {
    if (user && isEditing) {
      reset({
        name: user.name,
        avatar: user.avatar,
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
        avatar: data.avatar,
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
  
  const getBadgesForDomain = (domainId: string) => {
    const completedLevels = user?.progress?.[domainId] || 0;
    const badges = [];
    if (completedLevels >= 25) badges.push({ name: 'Basic', level: 'Basic' });
    if (completedLevels >= 50) badges.push({ name: 'Intermediate', level: 'Intermediate' });
    if (completedLevels >= 100) badges.push({ name: 'Master', level: 'Master' });
    return badges;
  }

  const enrolledDomains = domains.filter(domain => (user.progress?.[domain.id] || 0) > 0);

  return (
    <div className="container mx-auto max-w-6xl">
       <div className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">Your Profile</h1>
            <p className="text-muted-foreground text-lg">
            View and manage your personal information and progress.
            </p>
        </div>
        <Button variant="outline" size="icon" onClick={handleEditToggle} className="w-auto px-4 gap-2">
            {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            <span className="hidden sm:inline">{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8 md:grid-cols-1">
          <div className="space-y-8">
            <Card>
              <CardHeader className="items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={isEditing ? avatarUrl : user.avatar} alt={user.name} />
                  <AvatarFallback className="text-3xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isEditing ? (
                  <div className="w-full space-y-4">
                    <Input {...register('name')} className="text-2xl text-center font-bold" />
                    <div>
                      <Label htmlFor="avatar" className="sr-only">Avatar URL</Label>
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="avatar" {...register('avatar')} placeholder="Image URL" className="pl-9" />
                      </div>
                    </div>
                  </div>
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
            
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-muted-foreground">
                    <Fingerprint className="w-5 h-5" /> User ID
                  </h3>
                  <p className="text-sm text-foreground/80 font-mono">{`user-${user.id}`}</p>
                </div>
                <Separator />
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

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Progress &amp; Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {enrolledDomains.length > 0 ? (
                  <>
                    <div>
                      <h3 className="font-semibold mb-4 text-lg">Levels Completed</h3>
                      <div className="space-y-4">
                        {enrolledDomains.map((domain: Domain) => {
                          const completedLevels = user.progress?.[domain.id] || 0;
                          return (
                            <div key={domain.id}>
                              <div className="flex items-center gap-3">
                                <DomainIcon icon={domain.icon} className="h-6 w-6" />
                                <span className="font-medium flex-1">{domain.name}</span>
                                <span className="text-muted-foreground text-sm">
                                  Level <span className="font-bold text-foreground">{completedLevels}</span>
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-4 text-lg">Certifications</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {enrolledDomains.map((domain: Domain) => (
                          <div key={domain.id} className="rounded-lg border bg-card p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <DomainIcon icon={domain.icon} className="h-6 w-6" />
                              <h4 className="font-semibold flex-1">{domain.name}</h4>
                            </div>
                            <div className="flex justify-around items-end h-20">
                                {getBadgesForDomain(domain.id).length > 0 ? getBadgesForDomain(domain.id).map(badge => (
                                    <div key={badge.name} className="text-center">
                                        <BadgeIcon level={badge.level as any} />
                                        <p className="text-xs mt-1 font-medium">{badge.name}</p>
                                    </div>
                                )) : <p className="text-sm text-muted-foreground self-center">No badges yet.</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold">No Progress Yet</h3>
                    <p className="text-muted-foreground mt-2">Start a test to see your progress here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
