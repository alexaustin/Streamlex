#! C:\Python27\python


import sys, io, cgi, cgitb, glob, string


def Main():

        cgitb.enable()

        
        try:
                
                request = cgi.FieldStorage()
                
                requestType = request.getvalue('type')
        
                if requestType == 'menu':

                        loadMenu()

        except:

                print 'Content-Type: text/plain;charset=utf-8 200 OK\n'


def loadMenu():

        extensionList = [['aac','audio/aac'],['m3u','application/x-mpegURL'],['m3u8','application/x-mpegURL'],['mp3','audio/mp3'],['mp4','video/mp4'],['ogg','video/ogg'],['wav','audio/wav'],['webm','video/webm']]

        fileList = glob.glob('C:\\media/*')


        menu = '<div id="menuList">'

        for fileName in fileList:

                if len(fileName.strip()) > 0 and len(fileName.split('.')) > 1:

                        fileSrc = fileName[fileName.rfind('\\') + 1:].replace('\\','/')
                        fileDisplay = fileSrc.split('.')[0]
                        fileExtension = fileSrc.split('.')[1]

                        for ext in extensionList:
                                
                                if fileExtension == ext[0]:
                                
                                        menu = menu + '<div onclick="loadMedia(\'{0}\')">{1}</div>'.format('../media/' + fileSrc + '|' + ext[1], fileDisplay + '  [' + fileExtension + ']')

                                        break
        
        menu = menu + '</div>'
        
        print 'Content-Type: text/plain;charset=utf-8 200 OK\n'
        print menu


Main()




