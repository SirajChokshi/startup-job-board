# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django_mysql.models import JSONField
from django.contrib.auth.models import User
from django.contrib import admin
from django import forms
import datetime
import calendar

def addOneMonth(sourcedate, months):
    month = sourcedate.month - 1 + months
    year = sourcedate.year + month // 12
    month = month % 12 + 1
    day = min(sourcedate.day, calendar.monthrange(year, month)[1])
    return str(datetime.date(year, month, day))[:10]

# Create your models here.
# class AuthUser(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     isStartup = models.BooleanField(default=False)

class CustomUser(models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    email = models.CharField(max_length=50, default="")
    dateOfBirth = models.CharField(max_length=50)
    # authToken = models.CharField(max_length=100)
    userGradYear = models.IntegerField(default=(int(datetime.datetime.today().year) + 4))
    userMajor = models.CharField(max_length=100)
    userGPA = models.CharField(max_length=10)
    userDegree = models.CharField(max_length=100)
    # userPassword = models.CharField(max_length=100)
    userPitch = models.CharField(max_length=300)
    extraCurriculars = models.CharField(max_length=200, default="")
    userBookmarks = JSONField(default=dict)

    def __str__(self):
        """A string representation of a User"""
        return str(self.firstName) + " is a " + str(self.userMajor) + " major."

    def addBookmark(self, listing):
        self.userBookmarks.append(listing)

class Listing(models.Model):
    listName = models.CharField(max_length=50)
    listCategory = models.CharField(max_length=50)
    listDesc = models.CharField(max_length=250)
    listDeadline = models.CharField(max_length=10, default=addOneMonth(datetime.datetime.today(), 1))
    isPaid = models.BooleanField(default= True)
    listLocation = models.CharField(max_length=100)
    isOpen = models.BooleanField(default= True)
    listLongDesc = models.TextField()
    listOrgID = models.CharField(max_length=100, default="")
    externalLink = models.CharField(max_length=100, default="")

    class Meta:
        ordering = ['-id']

    def __str__(self):
        """A string representation of a Job Listing"""
        return str(self.listName) + ". " + str(self.listDesc)

    def setIsPaid(self, boolean):
        self.isPaid = boolean
        super(Listing, self).save()

    def getIsOpen(self):
        if (datetime.datetime.strptime(self.listDeadline, '%Y-%m-%d') < datetime.datetime.today()):
            return False
        return True

class Startup(models.Model):
    orgName = models.CharField(max_length=50)
    orgLocation = models.CharField(max_length=100)
    orgListings = JSONField(default=dict)
    orgDesc = models.CharField(max_length=300)
    orgIndustry = models.CharField(max_length=100)
    # authToken = models.CharField(max_length=100, default="")
    orgEmail = models.CharField(max_length=50, default="")
    # orgPassword = models.CharField(max_length=100, default="")

    def __str__(self):
        """A string representation of a Startup"""
        return str(self.orgName) + " is a " + str(self.orgIndustry) + " company."

    def addListing(self, listing):
        self.orgListings.append(listing)
