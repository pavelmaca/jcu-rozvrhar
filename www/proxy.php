<?php
/**
 * Created by IntelliJ IDEA.
 * User: Pavel
 * Date: 24.9.2016
 * Time: 23:11
 */

include_once __DIR__ . '/../vendor/autoload.php';

class Proxy
{
    protected $client;

    protected $data = [];

    public function __construct()
    {
        $this->client = new GuzzleHttp\Client([
            \GuzzleHttp\RequestOptions::VERIFY => \Composer\CaBundle\CaBundle::getSystemCaRootBundlePath(),
        ]);
    }

    public function run()
    {
        $courses = $_GET['courses'];
        foreach ($courses as $course) {
            $this->loadInfo($course['faculty'], $course['number']);
        }

        echo json_encode($this->data);
        exit;
    }

    protected function loadInfo($faculty, $number)
    {
        if (strlen($faculty) > 5 || strlen($number) > 5) {
            return;
        }

        $res = $this->client->request(
            'GET',
            'https://stag-ws.jcu.cz/ws/services/rest/predmety/getPredmetInfo',
            [
                'query' => [
                    'outputFormat' => 'JSON',
                    'lang' => 'cs',
                    'rok' => 2016,
                    'katedra' => $faculty,
                    'zkratka' => $number,
                ],
            ]);
        if ($res->getStatusCode() == 200) {
            $data = json_decode($res->getBody()->getContents());
            if (count($data) > 0 && $data[0] != null) {
                $index = $data[0]->katedra . '/'. $data[0]->zkratka;
                $this->data[$index] = $data[0];
            }
        }
    }
}

\Tracy\Debugger::enable();
$proxy = new Proxy();
$proxy->run();