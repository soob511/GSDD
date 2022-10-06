#!/bin/bash

cd /home/ubuntu/news
java -jar news.jar
scp news.txt j7b209@cluster.ssafy.io:/home/j7b209
ssh j7b209@cluster.ssafy.io hdfs dfs -rm news.txt
ssh j7b209@cluster.ssafy.io hdfs dfs -put news.txt
ssh j7b209@cluster.ssafy.io hadoop jar gsdd.jar article news.txt news_output
ssh j7b209@cluster.ssafy.io hdfs dfs -cat news_output/job2/* > DBarticle.txt
java -jar db.jar
