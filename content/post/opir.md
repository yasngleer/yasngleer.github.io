+++
date = "2017-07-15T15:30:41+02:00"
draft = false
title = "Orange Pi İr Kullanımı"

+++
### sunxi_cir modülünü yüklüyoruz.

    modprobe sunxi_cir

Aşağıdaki komut ile ir alıcımızı test edebiliriz.

    mode2 -d /dev/lirc0

Kumandamızı ir alıcısna doğru yöneltip tuşlara bastığımızda aşağıdaki gibi bir çıktı alıyorsak ir alıcısı çalışıyor demektir.

    space 16777215
    pulse 9008
    space 4480
    pulse 608
    space 552
    pulse 584

sunxi_cir modülünün her açılışta otomatik olarak yüklenmesi için /etc/lirc/hardware.conf dosyasının içindekileri silip aşağıdakileri yapıştırın.

    REMOTE_MODULES="sunxi_cir"
    REMOTE_DEVICE="/dev/lirc0"
    REMOTE_LIRCD_CONF=""
    REMOTE_LIRCD_ARGS=""

    #Enable lircd
    START_LIRCD="true"

    #Try to load appropriate kernel modules
    LOAD_MODULES="true"
    DRIVER="default"
    DEVICE="/dev/lirc0"
    MODULES="sunxi-cir"

    # Default configuration files for your hardware if any
    LIRCMD_CONF=""

    #to leave this set to "false"
    FORCE_NONINTERACTIVE_RECONFIGURATION="false"
    START_LIRCMD=""


### Artık kumandamızın tuşlarına isim atayabiliriz.
Aşağıdaki komut ile tuşlara verebileceğimiz isimleri görüntüleyebiliriz.

    irrecord --list-namespace

Kullanmak istediğiniz isimleri bir kenara yazmakta fayda var.
Aşağıdaki komut ile hangi tuşun hangi ismi çağıracağını ayralayabiliriz.   

    irrecord -d /dev/lirc0 ~/lircd.conf
      Press RETURN to continue. # enter
      Press RETURN now to start recording.#enter
      #kumandanızdaki kullanmak isytediğiniz tuşlara 2 sıra doluncaya kadar basın
      Please enter the name for the next button (press <ENTER> to finish recording)
      KEY_UP
      Now hold down button "KEY_UP".
      #işlem bittiğinde entere basarak sonlandırın

Tuşlara isim atamayı bitirdikten sonra aşağıdaki komutları sırasıyla çalıştırın.

    sudo cp ~/lircd.conf /etc/lirc/lircd.conf
    sudo /etc/init.d/lirc stop
    sudo /etc/init.d/lirc start

Yaptığımız işlemlerin çalıştığından emin olmak için aşağıdaki komutu çalıştırın.

    irw

Kumandadan isim atadığınız tuşları deneyin bastığınız tuşun isminin çıktıda görünmesi gerekir.

### Artık python kısmına geçebiliriz.

  -  python2.7 kullanıyorsanız

    wget https://github.com/tompreston/python-lirc/releases/download/v1.2.1/python-lirc_1.2.1-1_armhf.deb
    dpkg -i python-lirc_1.2.1-1_armhf.deb

  -  python3 kullanıyorsanız

    wget https://github.com/tompreston/python-lirc/releases/download/v1.2.1/python3-lirc_1.2.1-1_armhf.deb
    dpkg -i python3-lirc_1.2.1-1_armhf.deb

Lirc kütüphanesini kurduktan sonra python ile haberleştirebilmek için ~/.lircrc dosyasını oluşturup

      leafpad ~/.lircrc

ile veya herhangi bir editörle açıyoruz.
Ben kumandamın sadece iki tuşunu isimlendirdim biri KEY_UP diğeri KEY_DOWN

        begin
            prog = myprogram
            button = KEY_UP
            config = yukari
        end

        begin
            prog = myprogram
            button = KEY_DOWN
            config = asagi
        end

her tuş için begin ile başlayp end ile biten bir tanımlama yapmalıyız

prog =  bu kısımın tüm tanımlamalarda aynı olması gerekir herhangi bir değer verin

button = önceki adımlarda tuşa verdiğiniz değeri yazın

config = python dan tuşu kullanırken kullanacağımız değer herhangi bir değer verin

#### Örnek python kodu:

    #!/usr/bin/env python
    #coding: utf8

    import lirc
    import time
    import os

    sockid=lirc.init("myprogram")

    while True:
      codeIR = lirc.nextcode()
      print codeIR
      if codeIR != []:
        if codeIR[0] == "yukari":
          print "yukari tusuna bastınız"
        elif codeIR[0] == "asagi":
          print "yukari tusuna bastınız"



## !!KAYNAK!! http://codelectron.com/how-to-setup-infrared-remote-control-in-orange-pi-zero-using-lircd-and-python/ !!KAYNAK!!
