#####################################################################
# Barcode Simulator - for testing purposes
#
# This program will alt+tab to the last window, so make sure
# the last window is the one you want to simulate a barcode
# scan on!
#####################################################################
import sys
from subprocess import call
from time import sleep

while(1):
	try:
		serialNo = raw_input('Enter a barcode: ')
		serialNo = list(serialNo)
		call(['xdotool', 'key', 'alt+Tab'])
		sleep(0.01)
		for c in serialNo:
			call(['xdotool', 'key', c])
		call(['xdotool', 'key', 'KP_Enter'])
	except KeyboardInterrupt:
		print '\nbye'
		sys.exit()