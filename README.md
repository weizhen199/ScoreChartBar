# ScoreChartBar
udp2raw -c -l 0.0.0.0:1093 -r 103.117.100.196:4096 -k weizhen199 -a --keep-rule --raw-mode faketcp --cipher-mode xor --a
speederv2 -c -l 0.0.0.0:1092 -r 127.0.0.1:1093 -f 2:4 --timeout 0 --mode 0 -q1 --fifo /tmp/fifo.file
