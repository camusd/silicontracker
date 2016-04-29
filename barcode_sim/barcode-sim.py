#####################################################################
# Barcode Simulator - for testing purposes
#
# Examples of use: python barcode-sim.py 1234567890abcdef
#
# This program will alt+tab to the last window, so make sure
# the last window is the one you want to simulate a barcode
# scan on!
#####################################################################
import sys
from subprocess import call

serialNo = list(sys.argv[1])
call(['xdotool', 'key', 'alt+Tab'])
for c in serialNo:
	call(['xdotool', 'key', c])
call(['xdotool', 'key', 'KP_Enter'])