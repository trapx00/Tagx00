if [ "$1" == "start" ]; then
nohup java -jar "tagx00.jar" >tagx00_backend.txt &
cd python
nohup python3 run.py >tagx00_ml.txt &
cd ../../Tagx00.Frontend
npm start
else if [ "$1" == "stop" ]; then
PID=$(ps -ef | grep "tagx00.jar" | grep -v grep | awk '{ print $2 }')
kill -9 $PID
else if [ "$1" == "install"]; then
cd python
pip3 install -r requirements
cd ../../Tagx00.Frontend
npm install
fi
fi
fi
