if [ "$1" == "start" ]; then
nohup java -jar "tagx00.jar" >tagx00.txt &
cd python
pip3 install -r requirements.txt
python3 run.py
else if [ "$1" == "stop" ]; then
PID=$(ps -ef | grep "tagx00.jar" | grep -v grep | awk '{ print $2 }')
fi
fi